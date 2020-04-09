import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsRepository } from './products.repository';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductsRepository)
    private productsRepository: ProductsRepository,
  ) {
  }

  async create(createProductInput: CreateProductInput): Promise<Product> {
    return this.productsRepository.createProduct(createProductInput);
  }

  async findOneById(id): Promise<Product> {
    return this.productsRepository.findOneById(id);
  }
}
