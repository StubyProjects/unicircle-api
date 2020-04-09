import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { ProductModel } from './model/product.model'
import { CreateProductInput } from './dto/create-product.input';
import { ProductService } from './product.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Resolver(of => ProductModel)
export class ProductResolver {
  constructor(
    private productService: ProductService,
  ) {}

  @Query(returns => ProductModel)
  async getProduct(@Args('id', {type: () => Int}) id: number) {
    return this.productService.findOneById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Mutation(returns => ProductModel)
  async createProduct(@Args('createProductInput') createProductInput: CreateProductInput) {
    return this.productService.create(createProductInput);
  }


}
