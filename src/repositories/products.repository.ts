import { EntityRepository, Like, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { GetProductsFilterDto } from '../product/dto/get-products-filter.dto';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {

}
