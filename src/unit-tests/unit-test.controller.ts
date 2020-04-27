import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsRepository } from '../product/repositories/products.repository';
import { CreateProductInput } from '../product/dto/create-product.input';

/**
 * Controller which can be used to test specific methods of the whole backend.
 */
@Controller('test')
export class UnitTestController {

  constructor(@InjectRepository(ProductsRepository) private productRepository: ProductsRepository) {}

  @Post()
  async createProduct(@Body() createProductInput: CreateProductInput) {
    return this.productRepository.createEntity(createProductInput);
  }
}
