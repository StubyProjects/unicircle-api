import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { ProductModel } from './model/product.model'
import { CreateProductInput } from './dto/create-product.input';
import { ProductService } from './product.service';

@Resolver(of => ProductModel)
export class ProductResolver {
  constructor(
    private productService: ProductService,
  ) {}

  @Query(returns => ProductModel)
  async getProduct(@Args('id', {type: () => Int}) id: number) {
    return this.productService.findOneById(id);
  }

  @Mutation(returns => ProductModel)
  async createProduct(@Args('createProductInput') createProductInput: CreateProductInput) {
    return this.productService.create(createProductInput);
  }


}
