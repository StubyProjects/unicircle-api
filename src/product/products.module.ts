import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from './repositories/products.repository';
import { ProductlistingRepository} from './repositories/productlisting.repository';
import { ImagesRepository} from './repositories/images.repository';
import { ConditionsRepository} from './repositories/conditions.repository';
import { ProductService } from './product.service';
import { ProductsController } from './products.controller';
import { ReviewRepository } from '../review/review.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsRepository, ProductlistingRepository, ImagesRepository, ConditionsRepository,
      ReviewRepository]),
    HttpModule
  ],
  providers: [
    ProductService,
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
