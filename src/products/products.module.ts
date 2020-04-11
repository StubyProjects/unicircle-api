import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from './products.repository';
import { ProductService } from './product.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsRepository])
  ],
  providers: [
    ProductService,
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
