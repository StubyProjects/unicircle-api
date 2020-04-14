import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from '../repositories/products.repository';
import { ProductService } from './product.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsRepository]),
    HttpModule
  ],
  providers: [
    ProductService,
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
