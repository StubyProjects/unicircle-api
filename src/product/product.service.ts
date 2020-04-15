import {
  HttpException,
  HttpService, HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsRepository } from '../repositories/products.repository';
import { ProductlistingRepository } from '../repositories/productlisting.repository';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from '../entities/product.entity';
import { DeleteResult, Like } from 'typeorm';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';
import { map } from 'rxjs/operators';
import { Productlisting } from '../entities/productlisting.entity';
import { Condition, conditionName } from '../entities/condition.entity';
import { ImagesRepository } from '../repositories/images.repository';
import { ConditionsRepository } from '../repositories/conditions.repository';

/**
 * Service which handles database calls related to all product.
 * @author (Paul Dietrich)
 * @version (14.04.2020)
 */
@Injectable()
export class ProductService {

  constructor(@InjectRepository(ProductsRepository) private productsRepository: ProductsRepository,
              @InjectRepository(ProductlistingRepository) private productlistingRepository: ProductlistingRepository,
              @InjectRepository(ImagesRepository) private imagesRepository: ImagesRepository,
              @InjectRepository(ConditionsRepository) private conditionRepository: ConditionsRepository,
              private http: HttpService) {
  }

  /*API Key for Google Books*/
  bookAPIKey = 'AIzaSyAKzeje5Zj62kUafvDwz6EnYB0EweJLjOw';

  /**
   * Adds a new product to the database. If this product is already sold by another vendor,
   * only a new product listing gets created.
   * @param createProductInput - all data which is needed to create a new product
   * @param user
   */
  async listProduct(createProductInput: CreateProductInput, user): Promise<Productlisting> {
    const { isbn,images, conditionName } = createProductInput;

    // checks if the product is already in the database (in the product table).
    let existingProduct = await this.productsRepository.findOne({ where: { isbn: isbn } });
    if (existingProduct == undefined) {
      existingProduct = await this.createProduct(createProductInput);
    }

    let newCondition = await this.conditionRepository.findOne({ where: { name: conditionName}});
    if(newCondition == undefined) {
       newCondition = await this.createCondition(createProductInput);
    }
    const productListing = await this.createProductListing(createProductInput, existingProduct, newCondition, user);

    // Creates a new database entry for every image the seller uploaded and links them to the new listing of the seller.
    await images.forEach(image => {
      image.productListing = productListing;
      this.imagesRepository.save(image);
    });
    return productListing;
  }

  /**
   * Creates a new product listing in the database.
   * @param createProductInput - attributes of the product which are needed to create the listing
   * @param user - seller who makes the listing
   * @param existingProduct
   * @param newCondition - the condition in which the product is in
   */
  private async createProductListing(createProductInput: CreateProductInput, existingProduct, newCondition, user) {
    const { price } = createProductInput;
    const productListing = new Productlisting();
    productListing.createdAt = Date.now().toString();
    productListing.price = price;
    productListing.product = existingProduct;
    productListing.condition = newCondition;
    productListing.userId = user.id;
    await this.productlistingRepository.save(productListing);
    return productListing;
  }

  /**
   * Creates a new condition in the database.
   * @param createProductInput -  attributes of the product which are needed to create the condition.
   */
  private async createCondition(createProductInput: CreateProductInput) {
    const { conditionName, conditionDescription } = createProductInput;

    const condition = new Condition();
    condition.name = conditionName;
    condition.description = conditionDescription;
    await this.conditionRepository.save(condition);
    return condition;
  }

  /**
   * Creates a new product in the product table. This only happens if the specified product isn't in the database already.
   * @param createProductInput - the attributes which are needed to create the product.
   */
  private async createProduct(createProductInput: CreateProductInput) {
    const { title, isbn, description, author, listPrice, imageUrl, category } = createProductInput;

    const product = new Product();
    product.title = title;
    product.isbn = isbn;
    product.description = description;
    product.author = author;
    product.listPrice = listPrice;
    product.imageUrl = imageUrl;
    product.category = category;
    await this.productsRepository.save(product);
    return product;
  }

  async findOneById(id: string): Promise<Product> {
    return this.productsRepository.findOne(id);
  }

  async getAllProducts(): Promise<Array<Product>> {
    return await this.productsRepository.find();
  }

  async getSellerProducts(user): Promise<Productlisting[]> {
    return await this.productlistingRepository.find({ where: { userId: user.id } });
  }

  async getProductsWithFilters(filterDto: GetProductsFilterDto) {
    return await this.getProductsWithFiltersDB(filterDto);
  }

  async getBySearch(searchTerm) {
    const products: Array<Product> = await this.findBySearch(searchTerm);
    if (products.length == 0) {
      return this.googleBookSearch(searchTerm);
    } else {
      return products;
    }
  }

  async updateProduct(id, updateProductInput, user): Promise<Productlisting> {
    if (this.validateOwner(id, user)) {
      await this.productlistingRepository.update(id, updateProductInput);
      return await this.productlistingRepository.findOne(id);
    }
  }

  async deleteProduct(id, user): Promise<DeleteResult> {
    if (this.validateOwner(id, user)) {
      const productListing = await this.productlistingRepository.findOne(id);
      const images = await this.imagesRepository.find( { where: { productListing: productListing}});
      images.forEach(image => {
        this.imagesRepository.delete(image);
      });
      return this.productlistingRepository.delete(id);
    }
  }

  /**
   * If a user searches a book which isn't in our database, it gets searched for in the google Books database.
   * @param searchTerm - how the user searches for the book, e.g. ISBN , title, author, etc.
   */
  googleBookSearch(searchTerm) {
    return this.http.get('https://www.googleapis.com/books/v1/volumes?q=' + searchTerm + '&key=' + this.bookAPIKey)
      .pipe(map(response => response.data));
  }

  /**
   * Validates if the user which wants to make a write-operation on a product (e.g. delete, update), owns the product.
   * @param id - id of the product
   * @param user - user who is getting validated
   */
  async validateOwner(id, user): Promise<boolean> {
    const productListing = await this.productlistingRepository.findOne(id);
    if (productListing.userId !== user.id) {
      throw new HttpException(
        'You do not own this product',
        HttpStatus.UNAUTHORIZED);
    } else {
      return true;
    }
  }

  async findBySearch(searchTerm) {
    return await this.productsRepository.find({ where: [
        { description: Like('%' + searchTerm + '%') },
        { author: Like('%' + searchTerm + '%') },
      ]
    });
  }

  /*
   *Searches for product where one of the specified attributes partially matches the specified search term.
   * (FULL TEXT SEARCH)
   */
  async getProductsWithFiltersDB(filterDto: GetProductsFilterDto) {
    const { search } = filterDto;
    return this.productsRepository.find(
      {
        where: [
          { description: Like('%' + search + '%') },
          { author: Like('%' + search + '%') },
        ],
      });
  }
}
