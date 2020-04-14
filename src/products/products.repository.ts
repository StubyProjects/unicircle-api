import { EntityRepository, Like, Repository } from 'typeorm';
import { Product } from './product.entity';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {


  async findBySearch(searchTerm) {
    return await this.find({ where: [
        { name: Like('%' + searchTerm + '%') },
        { description: Like('%' + searchTerm + '%') },
        { author: Like('%' + searchTerm + '%') },
      ]
    });
  }

  /*
   *Searches for products where one of the specified attributes partially matches the specified search term.
   * (FULL TEXT SEARCH)
   */
  async getProductsWithFilters(filterDto: GetProductsFilterDto) {
    const { search } = filterDto;
    return this.find(
      {
        where: [
          { name: Like('%' + search + '%') },
          { description: Like('%' + search + '%') },
          { author: Like('%' + search + '%') },
        ],
      });
  }

}
