import { HttpModule, Module } from '@nestjs/common';
import { UniversityRepository } from './repositories/university.repository';
import { CourseRepository } from './repositories/course.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniversityService } from './university.service';
import { UniversityController } from './university.controller';

@Module({ imports: [
    TypeOrmModule.forFeature([UniversityRepository, CourseRepository]),
    HttpModule
  ],
  providers: [
    UniversityService,
  ],
  controllers: [UniversityController],
})
export class UniversityModule {}
