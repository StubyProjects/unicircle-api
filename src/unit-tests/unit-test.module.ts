import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from '../product/repositories/products.repository';
import { UnitTestController } from './unit-test.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsRepository]),
  ],
  providers: [],
  controllers: [UnitTestController],
})
export class UnitTestModule {}
