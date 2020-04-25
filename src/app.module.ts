import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './product/products.module';
import { AuthzModule } from './authz/authz.module';
import { ReviewModule } from './review/review.module';
import { UniversityModule } from './university/university.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    AuthzModule,
    TypeOrmModule.forRoot(),
    ProductsModule,
    ReviewModule,
    UniversityModule,
    OrderModule,
  ]
})
export class AppModule {}

