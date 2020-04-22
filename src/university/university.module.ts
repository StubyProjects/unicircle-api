import { HttpModule, Module } from '@nestjs/common';
import { UniversityRepository } from './repositories/university.repository';
import { CourseRepository } from './repositories/course.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniversityService } from './university.service';
import { UniversityController } from './controllers/university.controller';
import { ProductsRepository } from '../product/repositories/products.repository';
import { CourseController } from './controllers/course.controller';

@Module({ imports: [
    TypeOrmModule.forFeature([UniversityRepository, CourseRepository, ProductsRepository]),
    HttpModule
  ],
  providers: [
    UniversityService,
  ],
  controllers: [UniversityController, CourseController],
})
export class UniversityModule {}
