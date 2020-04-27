import {
  HttpException,
  HttpService, HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsRepository } from './repositories/products.repository';
import { ProductlistingRepository } from './repositories/productlisting.repository';
import { CreateProductInput, UpdateProductInput } from './dto/create-product.input';
import { Product } from './entities/product.entity';
import { DeleteResult, getRepository } from 'typeorm';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';
import { map } from 'rxjs/operators';
import { Productlisting } from './entities/productlisting.entity';
import { ImagesRepository } from './repositories/images.repository';
import { ConditionsRepository } from './repositories/conditions.repository';
import { ReviewRepository } from '../review/review.repository';
import { Condition } from './entities/condition.entity';
import { Author } from './entities/author.entity';
import { Category } from './entities/category.entity';

/**
 * Service which handles database calls related to all product.
 * @author (Paul Dietrich, Jakob Stuby)
 * @version (16.04.2020)
 */
@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(ProductsRepository)
    private productsRepository: ProductsRepository,
    @InjectRepository(ProductlistingRepository)
    private productListingRepository: ProductlistingRepository,
    @InjectRepository(ImagesRepository)
    private imagesRepository: ImagesRepository,
    @InjectRepository(ConditionsRepository)
    private conditionRepository: ConditionsRepository,
    @InjectRepository(ReviewRepository)
    private reviewRepository: ReviewRepository,
    private http: HttpService) {
  }

  /**
   * Adds a new product to the database. If this product is already sold by another vendor,
   * only a new product listing gets created.
   * @param createProductInput - all data which is needed to create a new product
   * @param user
   */
  async listProduct(createProductInput: CreateProductInput, user): Promise<Productlisting> {
    const { isbn10, isbn13, images, conditionName } = createProductInput;

    //If the User didn't provide images for his listing, the request is denied and a Exception gets returned.
    if(images.length < 1) {
      throw new HttpException('No Images provided', HttpStatus.PARTIAL_CONTENT);
    } else {
      //checks if the general product and condition of the listing's product already exist and if not, creates them.
      const newProduct = await this.getOrCreateProduct(isbn10, isbn13, createProductInput);
      const newCondition = await this.getOrCreateCondition(conditionName, createProductInput);

      const productListing = await this.productListingRepository.createProductListing(createProductInput, newProduct, newCondition, user);
      // Creates a new database entry for every image the seller uploaded and links them to the new listing of the seller.
      await images.forEach(image => {
        image.productListing = productListing;
        this.imagesRepository.save(image);
      });
      return productListing;
    }
  }

  // checks if the product is already in the database and if not, creates a new one.
  async getOrCreateProduct(isbn10: string, isbn13: string, values: CreateProductInput): Promise<Product> {
    const { categories, authors } = values;
    let newProduct = await this.productsRepository.findOne({ where: [{ isbn10: isbn10 }, { isbn13: isbn13 }] });
    if (newProduct == undefined) {
      newProduct = await this.productsRepository.createEntity(values);
    }
    await this.saveArray(categories, Category, newProduct);
    await this.saveArray(authors, Author, newProduct);
    return newProduct;
  }

  // Creates a new database entry for every item (Author or Category) that belongs to the product.
  async saveArray(array: Array<Category | Author>, type, product) {
    await array.forEach(item => {
      item.product = product;
      getRepository(type).save(item);
    });
  }

  // checks if the condition is already in the database and if not, creates a new one.
  async getOrCreateCondition(searchTerm: string, values: CreateProductInput): Promise<Condition> {
    let newCondition = await this.conditionRepository.findOne({ where: { name: searchTerm } });
    if (newCondition == undefined) {
      newCondition = await this.conditionRepository.createEntity(values);
    }
    return newCondition;
  }

  async getConditions(): Promise<Condition[]> {
    return await this.conditionRepository.find();
  }

  //returns one product with the specified id.
  async findOneById(id: string): Promise<Product> {
    return this.productsRepository.findOne(id);
  }

  //returns all products with a pagination of 15.
  async getAllProducts(page = 1): Promise<Array<Product>> {
    return await this.productsRepository.find({ take: 15, skip: 15 * (page - 1) });
  }

  //returns all products of one seller.
  async getSellerProducts(user): Promise<Productlisting[]> {
    return await this.productListingRepository.find({ where: { userId: user.id } });
  }

  //returns all products which match the filters in the filterDto.
  async getProductsWithFilters(filterDto: GetProductsFilterDto) {
    return await this.productsRepository.getProductsWithFilters(filterDto);
  }

  /**
   * search algorithm for the products.
   * @param searchTerm - self explanatory.
   */
  async getBySearch(searchTerm: string) {
    const products: Product[] = await this.productsRepository.findBySearch(searchTerm);
   if (products.length == 0) {
      return this.googleBookSearch(searchTerm);
    } else {
      return products;
   }
  }

  /**
   * After validating the owner, the productListing gets updated
   * @param id - id of the product
   * @param updateProductInput - all the fields which should be updated
   * @param user - the user who wants to make the update
   */
  async updateProduct(id: string, updateProductInput: UpdateProductInput, user): Promise<Productlisting> {
    if (this.validateOwner(id, user)) {
      await this.productListingRepository.update(id, updateProductInput);
      return await this.productListingRepository.findOne(id);
    }
  }

  /**
   * Deletes a productListing from the database
   * @param bookId - id of the product
   * @param user - the user who wants to make the delete.
   */
  async deleteProductListing(bookId: string, user): Promise<DeleteResult> {
    if (this.validateOwner(bookId, user)) {
      const productListing = await this.productListingRepository.findOne(bookId);

      //deletes all images associated to the productListing.
      const images = await this.imagesRepository.find({ where: { productListing: productListing } });
      images.forEach(image => {
        this.imagesRepository.delete(image);
      });
      //checks if there are more listings for this product and if not, the general product gets
      //deleted as well.
      const product = productListing.product;
      if (this.wasLastListingFor(product)) {
        this.deleteProduct(product);
      }
      return this.productListingRepository.delete(bookId);
    }
  }

  /**
   * deletes the general product and all reviews associated to it.
   * @param product - the product
   */
  async deleteProduct(product: Product) {
    const reviews = await this.reviewRepository.find({ where: { product: product } });
    reviews.forEach(review => {
      this.reviewRepository.deleteReview(review.id);
    });
    return await this.productsRepository.delete(product);
  }

  /**
   * Checks whether the deleted listing was the last one for the general product.
   * @param product - the general product.
   */
  async wasLastListingFor(product: Product): Promise<boolean> {
    const lastListing = await this.productListingRepository.findOne({ where: { product: product } });
    return !lastListing;
  }

  /**
   * If a user searches a book which isn't in our database, it gets searched for in the google Books database.
   * @param searchTerm - how the user searches for the book, e.g. ISBN , title, author, etc.
   */
  async googleBookSearch(searchTerm: string) {
    return this.http.get('https://www.googleapis.com/books/v1/volumes?q=' + searchTerm + '&key=' + process.env.GOOGLE_BOOKS_KEY)
      .pipe(map(response => response.data));
  }

  /**
   * Validates if the user which wants to make a write-operation on a product (e.g. delete, update), owns the product.
   * @param id - id of the product
   * @param user - user who is getting validated
   */
  async validateOwner(id: string, user): Promise<boolean> {
    const productListing = await this.productListingRepository.findOne(id);
    if (productListing.userId !== user.sub) {
      throw new HttpException(
        'You do not own this product',
        HttpStatus.UNAUTHORIZED);
    } else {
      return true;
    }
  }

}
