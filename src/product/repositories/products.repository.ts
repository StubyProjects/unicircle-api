import { EntityRepository, Like, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { GetProductsFilterDto } from '../dto/get-products-filter.dto';
import { CreateProductInput } from "../dto/create-product.input";

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {

    /**
     * Creates a new product in the product table. This only happens if the specified product isn't in the database already.
     * @param createProductInput - the attributes which are needed to create the product.
     */
    async createProduct(createProductInput: CreateProductInput) {
        const { title, isbn, description, author, listPrice, imageUrl, category } = createProductInput;

        const product = new Product();
        product.title = title;
        product.isbn = isbn;
        product.description = description;
        product.author = author;
        product.listPrice = listPrice;
        product.imageUrl = imageUrl;
        product.category = category;
        await this.save(product);
        return product;
    }

  /*
   *Searches for product where one of the specified attributes partially matches the specified search term.
   * (FULL TEXT SEARCH)
   */
  async getProductsWithFilters(filterDto: GetProductsFilterDto) {
    const { search } = filterDto;
    return this.find(
      {
        where: [
          { description: Like('%' + search + '%') },
          { author: Like('%' + search + '%') },
        ],
      });
  }

  async findBySearch(searchTerm) {
    return await this.find({ where: [
        { description: Like('%' + searchTerm + '%') },
        { author: Like('%' + searchTerm + '%') },
      ]
    });
  }

}
