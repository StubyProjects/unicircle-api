import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from './repositories/products.repository';
import { ProductlistingRepository} from './repositories/productlisting.repository';
import { ImagesRepository} from './repositories/images.repository';
import { ConditionsRepository} from './repositories/conditions.repository';
import { ProductService } from './product.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsRepository, ProductlistingRepository, ImagesRepository, ConditionsRepository]),
    HttpModule
  ],
  providers: [
    ProductService,
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
