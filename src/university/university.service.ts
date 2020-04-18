import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UniversityRepository } from './repositories/university.repository';
import { ReadingRepository } from './repositories/reading.repository';
import { CourseRepository } from './repositories/course.repository';
import { ProductsRepository } from '../product/repositories/products.repository';
import { getRepository } from 'typeorm';
import { University } from './entities/university.entity';
import { Course } from './entities/course.entity';

/**
 * Service which connects to the database for university related operations.
 * @author (Paul Dietrich)
 * @version (17.04.2020)
 */
@Injectable()
export class UniversityService {

  constructor(@InjectRepository(UniversityRepository) private universityRepository: UniversityRepository,

              @InjectRepository(ReadingRepository) private readingRepository: ReadingRepository,

              @InjectRepository(CourseRepository) private courseRepository: CourseRepository,

              @InjectRepository(ProductsRepository) private productRepository: ProductsRepository) {}

  /**
   * Returns all universities in the database
   */
  async getUniversities(): Promise<University[]> {
    return this.universityRepository.find();
  }

  /**
   * Returns all courses of one university
   * @param uniId - the id of the university
   */
  async getCoursesOfUniversity(uniId): Promise<Course[]> {
    const university = await this.universityRepository.find({ where: { id: uniId}});
    return this.courseRepository.find({ where: { university: university}});
  }

  /**
   * Gets all products of one courses of one university.
   * @param courseId - id of the course which is searched
   */
  async getCourseProductsById(courseId) {
    return this.courseRepository.getCourseProductsById(courseId);
  }

  /**
   * Gets all products which are read in all courses of the university
   * @param courseId - Id of the course which is searched
   * @param semester - the semester which is searched
   */
  async getSemesterProductsById(courseId, semester) {
    return this.courseRepository.getSemesterProductsById(courseId, semester);
  }
 }
