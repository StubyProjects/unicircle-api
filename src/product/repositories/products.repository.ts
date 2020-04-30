import { EntityRepository, getRepository, Like, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { GetProductsFilterDto } from '../dto/get-products-filter.dto';
import { CreateProductInput } from '../dto/create-product.input';
import { Category } from '../entities/category.entity';
import { Author } from '../entities/author.entity';

export class CompleteProduct {
  details: any;
  categories: Array<Category>;
  authors: Array<Author>;
}

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {

  /**
   * Creates a new product in the product table. This only happens if the specified product isn't in the database already.
   * @param createProductInput - the attributes which are needed to create the product.
   */
  async createEntity(createProductInput: CreateProductInput) {
    const {
      title, subtitle, isbn10, isbn13, description, listPrice,
      imageUrl, publisher,
    } = createProductInput;

    const product = new Product();
    product.title = title;
    product.subtitle = subtitle;
    product.isbn10 = isbn10;
    product.isbn13 = isbn13;
    product.description = description;
    product.listPrice = listPrice;
    product.imageUrl = imageUrl;
    product.publisher = publisher;

    await this.save(product);

    return product;
  }

  async findOneById(id) {
    const details = await this.findOne(id);
    const categories = await ProductsRepository.getCategories(id);
    const authors = await ProductsRepository.getAuthors(id);

    return {
      details,
      categories,
      authors,
    };
  }

  async getAllProducts(page): Promise<any[]> {
    const simpleProducts = await this.find({ take: 15, skip: 15 * (page - 1) });
    const completeProducts = [];

    for (const details of simpleProducts) {
      const categories = await ProductsRepository.getCategories(details.id);
      const authors = await ProductsRepository.getAuthors(details.id);

      const completeProduct: CompleteProduct = {
        details,
        categories,
        authors
      };
      completeProducts.push(completeProduct);
    }
    return completeProducts;
  }

  private static async getCategories(id) {
    return await getRepository(Category)
      .createQueryBuilder('category')
      .innerJoin('category.inclusions', 'isIncluded')
      .where('isIncluded.product.id = :id', { id: id })
      .getMany();
  }

  private static async getAuthors(id) {
    return await getRepository(Author)
      .createQueryBuilder('author')
      .innerJoin('author.writings', 'writing')
      .where('writing.product.id = :id', { id: id })
      .getMany();
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
    return await this.find({
      where: [
        { title: Like('%' + searchTerm + '%') },
        { subtitle: Like('%' + searchTerm + '%') },
        { isbn10: Like('%' + searchTerm + '%') },
        { isbn13: Like('%' + searchTerm + '%') },
        { description: Like('%' + searchTerm + '%') },
      ],
    });
  }

}
