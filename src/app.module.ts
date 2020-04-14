import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './product/products.module';
import { AuthzModule } from './authz/authz.module';

@Module({
  imports: [
    AuthzModule,
    TypeOrmModule.forRoot(),
    ProductsModule,
  ]
})
export class AppModule {}

