import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './model/product.model';
import { CreateProductInput } from './dto/create-product.input';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
export class ProductsController {

  constructor(private productService: ProductService) {}


  @Get()
  async getAllProducts(): Promise<Array<Product>> {
    return this.productService.getAllProducts()
  }

  @Get('/:id')
  async getProductById(@Param('id') id:string) {
    return this.productService.findOneById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createProduct(@Body() createProductInput: CreateProductInput): Promise<Product> {
    return this.productService.createProduct(createProductInput);
  }
}
