import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './product/products.module';
import { AuthzModule } from './authz/authz.module';
import { ReviewModule } from './review/review.module';
import { UniversityModule } from './university/university.module';
import { OrderModule } from './order/order.module';
import { UnitTestModule } from './unit-tests/unit-test.module';
import { UserModule } from './user/user.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    AuthzModule,
    TypeOrmModule.forRoot(),
    ProductsModule,
    ReviewModule,
    UniversityModule,
    OrderModule,
    UnitTestModule,
    UserModule,
    NotificationModule
  ]
})
export class AppModule {}

