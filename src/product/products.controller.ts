import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductInput } from './dto/create-product.input';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult } from 'typeorm';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';
import { UpdateProductInput } from './dto/create-product.input';
import { User } from '../custom-decorators/user.decorator';
import { UserModel as UserEntity} from '../types/user.model';
import { Product } from './entities/product.entity';
import { Productlisting } from './entities/productlisting.entity';

/**
 * Controller for the product. Communicates with the frontend Client application.
 * It's methods call methods from the productService, which then again communicates with the productRepository.
 * Can be called by http://localhost:8000/product
 *
 * @author (Paul Dietrich)
 * @version (13.04.2020)
 */
@Controller('products')
export class ProductsController {

  constructor(private productService: ProductService) {}


  @Get()
  async getProducts(@Body() filterDto: GetProductsFilterDto, @Query('page') page): Promise<Product[]> {

    if(Object.keys(filterDto).length) {
      return this.productService.getProductsWithFilters(filterDto);
    }
    else {
      return this.productService.getAllProducts(page)
    }
  }

  @Get('/:id')
  async getProductById(@Param('id') id:string) {
    return this.productService.findOneById(id);
  }

  @Get('books')
  async getSellerProducts(@User() user: UserEntity) {
    return this.productService.getSellerProducts(user);
  }

  @Get('search/:term')
  async getBySearchTerm(@Param('term') term:string) {
    return this.productService.getBySearch(term);
  }


  @UseGuards(AuthGuard('jwt'))
  @Post()
  async listProduct(
    @Body() createProductInput: CreateProductInput,
    @User() user: UserEntity): Promise<Productlisting> {
    return this.productService.listProduct(createProductInput, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  async updateProduct(
    @Param('id') id:string,
    @Body() updateProductInput: UpdateProductInput,
    @User() user: UserEntity): Promise<Productlisting> {

    return this.productService.updateProduct(id, updateProductInput, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteProduct(
    @Param('id') id:string,
    @User() user: UserEntity): Promise<DeleteResult> {
    return this.productService.deleteProductListing(id, user);
  }
}
