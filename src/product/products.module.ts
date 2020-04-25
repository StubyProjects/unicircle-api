import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from './repositories/products.repository';
import { ProductlistingRepository} from './repositories/productlisting.repository';
import { ImagesRepository} from './repositories/images.repository';
import { ConditionsRepository} from './repositories/conditions.repository';
import { ProductService } from './product.service';
import { ReviewRepository } from '../review/review.repository';
import { ProductsController } from './controllers/products.controller';
import { ConditionController } from './controllers/condition.controller';
import { MangopayModule } from '../mangopay/mangopay.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsRepository, ProductlistingRepository, ImagesRepository, ConditionsRepository,
      ReviewRepository]),
    HttpModule,
    MangopayModule
  ],
  providers: [
    ProductService,
  ],
  controllers: [ProductsController, ConditionController],
})
export class ProductsModule {}
