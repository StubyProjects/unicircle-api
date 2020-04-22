import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './product/products.module';
import { AuthzModule } from './authz/authz.module';
import { ReviewModule } from './review/review.module';
import { UniversityModule } from './university/university.module';

@Module({
  imports: [
    AuthzModule,
    TypeOrmModule.forRoot(),
    ProductsModule,
    ReviewModule,
    UniversityModule,
  ]
})
export class AppModule {}

