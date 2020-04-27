import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './product/products.module';
import { AuthzModule } from './authz/authz.module';
import { ReviewModule } from './review/review.module';
import { UniversityModule } from './university/university.module';
import { OrderModule } from './order/order.module';
import { UnitTestModule } from './unit-tests/unit-test.module';

@Module({
  imports: [
    AuthzModule,
    TypeOrmModule.forRoot(),
    ProductsModule,
    ReviewModule,
    UniversityModule,
    OrderModule,
    UnitTestModule
  ]
})
export class AppModule {}

