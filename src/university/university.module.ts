import { HttpModule, Module } from '@nestjs/common';
import { UniversityRepository } from './repositories/university.repository';
import { CourseRepository } from './repositories/course.repository';
import { ReadingRepository } from './repositories/reading.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniversityService } from './university.service';
import { UniversityController } from './university.controller';
import { ProductsRepository } from '../product/repositories/products.repository';

@Module({ imports: [
    TypeOrmModule.forFeature([UniversityRepository, CourseRepository, ReadingRepository, ProductsRepository]),
    HttpModule
  ],
  providers: [
    UniversityService,
  ],
  controllers: [UniversityController],
})
export class UniversityModule {}
