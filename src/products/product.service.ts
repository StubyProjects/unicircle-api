import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsRepository } from './products.repository';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from './product.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductsRepository)
    private productsRepository: ProductsRepository,
  ) {
  }

  async createProduct(createProductInput: CreateProductInput): Promise<Product> {
    return this.productsRepository.createProduct(createProductInput);
  }

  async findOneById(id: string): Promise<Product> {
    return this.productsRepository.findOneById(id);
  }

  async getAllProducts(): Promise<Array<Product>> {
    return await this.productsRepository.getAllProducts();
  }

  async getProductsWithFilters(filterDto: GetTasksFilterDto): Promise<Array<Product>> {
    return await this.productsRepository.getProductsWithFilters(filterDto);
  }

  async deleteProduct(id): Promise<DeleteResult> {
    return await this.productsRepository.deleteProduct(id);
  }

  async findByTitle(title): Promise<Product[]> {
    return await this.productsRepository.findByTitle(title);
  }

  async updateProduct(id, updatedAttribute):Promise<UpdateResult> {
    return await this.productsRepository.updateProduct(id, updatedAttribute)
  }
}
