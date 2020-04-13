import { EntityRepository, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as uuid from 'uuid/v1'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

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

  async findByTitle(title) {
    return this.find({ where: { title: title}});
  }

  async getAllProducts() {
    return this.find();
  }

  /*
  Searches for products where one of the specified attributes matches the specified search term.
   */
  async getProductsWithFilters(filterDto:GetTasksFilterDto) {

    const { search } = filterDto;

    return this.find( { where: [ { title: search}, { description: search}, { author: search}]});
  }

  async deleteProduct(id) {
    return this.delete(id);
  }

  async updateProduct(id, updatedAttribute) {
    return this.update(id, updatedAttribute)
  }

}
