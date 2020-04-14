import {
  ConflictException,
  HttpException,
  HttpService, HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsRepository } from './products.repository';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from './product.entity';
import { DeleteResult, Like } from 'typeorm';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';
import { map } from 'rxjs/operators';

/**
 * Service which handles database calls related to all products.
 * @author (Paul Dietrich)
 * @version (14.04.2020)
 */
@Injectable()
export class ProductService {

  constructor(@InjectRepository(ProductsRepository) private productsRepository: ProductsRepository,
              private http: HttpService) {}

  /*API Key for Google Books*/
  bookAPIKey = 'AIzaSyAKzeje5Zj62kUafvDwz6EnYB0EweJLjOw';

  async createProduct(createProductInput: CreateProductInput, user): Promise<Product> {
    const { name, description, author, price, image } = createProductInput;

    const product = new Product();

    product.name = name;
    product.description = description;
    product.author = author;
    product.price = price;
    product.image = image;
    product.owner = user.id;

    try {
      await product.save();
      return product;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Product with this name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findOneById(id: string): Promise<Product> {
    return this.productsRepository.findOne(id);
  }

  async getAllProducts(): Promise<Array<Product>> {
    return await this.productsRepository.find();
  }

  async getSellerProducts(user): Promise<Array<Product>> {
    return await this.productsRepository.find({ where: { owner: user.id}});
  }

  async getProductsWithFilters(filterDto: GetProductsFilterDto) {
    return await this.productsRepository.getProductsWithFilters(filterDto);
  }

  async getBySearch(searchTerm) {
    const products: Array<Product> = await this.productsRepository.findBySearch(searchTerm);
    if(products.length == 0) {
      return this.googleBookSearch(searchTerm);
    }
    else {
      return products;
    }
  }

  async updateProduct(id, updateProductInput, user):Promise<Product> {
    if (this.validateOwner(id, user)) {
      await this.productsRepository.update(id, updateProductInput);
      return await this.productsRepository.findOne(id);
    }
  }

  async deleteProduct(id, user): Promise<DeleteResult> {
    if (this.validateOwner(id, user)) {
      return this.productsRepository.delete(id);
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
    const product = await this.productsRepository.findOne(id);
    if (product.owner !== user.id) {
      throw new HttpException(
        'You do not own this product',
        HttpStatus.UNAUTHORIZED);
    } else {
      return true;
    }
  }
}
