import { EntityRepository, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {

  async createProduct(createProductInput: CreateProductInput) {
    const { name, price, image } = createProductInput;

    const product = new Product();
    product.name = name;
    product.price = price;
    product.image = image;

    try {
      await product.save();
      return product;
    } catch (error) {
      if(error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Product with this name already exists')
      } else{
        throw new InternalServerErrorException();
      }
    }
  }

  async findOneById(id) {
    return this.findOne(id);
  }

}
