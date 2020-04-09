import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from './products.repository';
import { ProductService } from './product.service';
import { ProductResolver } from './products.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsRepository])
  ],
  providers: [
    ProductService,
    ProductResolver
  ],
})
export class ProductsModule {}
