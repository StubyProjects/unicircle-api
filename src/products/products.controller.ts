import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './model/product.model';
import { CreateProductInput } from './dto/create-product.input';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult } from 'typeorm';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

/**
 * Controller for the products. Communicates with the frontend Client application.
 * It's methods call methods from the productService, which then again communicates with the productRepository.
 *
 * @author (Paul Dietrich)
 * @version (13.04.2020)
 */
@Controller('products')
export class ProductsController {

  constructor(private productService: ProductService) {}


  @Get()
  async getProducts(@Query() filterDto: GetTasksFilterDto): Promise<Array<Product>> {

    if(Object.keys(filterDto).length) {
      return this.productService.getProductsWithFilters(filterDto);
    }
    else {
      return this.productService.getAllProducts()
    }
  }

  @Get('/:id')
  async getProductById(@Param('id') id:string) {
    return this.productService.findOneById(id);
  }

  @Get('/:title')
  async findByTitle(@Param('title') title:string) {
    return this.productService.findByTitle(title);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createProduct(@Body() createProductInput: CreateProductInput): Promise<Product> {
    return this.productService.createProduct(createProductInput);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteProduct(@Param('id') id:string): Promise<DeleteResult> {
    return this.productService.deleteProduct(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  async updateProduct(@Param('id') id:string, @Body('attribute') attribute: string) {
    return this.productService.updateProduct(id, attribute);
  }
}
