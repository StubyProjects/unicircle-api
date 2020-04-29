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
import { CategoryRepository } from './repositories/category.reposiotry';
import { AuthorRepository } from './repositories/author.repository';
import { IsIncludedRepository } from './repositories/isIncluded.repository';
import { WrittenByRepository } from './repositories/written-by.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsRepository, ProductlistingRepository, ImagesRepository, ConditionsRepository,
      ReviewRepository, CategoryRepository, AuthorRepository, IsIncludedRepository, WrittenByRepository]),
    HttpModule
  ],
  providers: [
    ProductService,
  ],
  controllers: [ProductsController, ConditionController],
})
export class ProductsModule {}
