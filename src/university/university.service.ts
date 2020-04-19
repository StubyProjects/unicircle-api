import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UniversityRepository } from './repositories/university.repository';
import { CourseRepository } from './repositories/course.repository';
import { ProductsRepository } from '../product/repositories/products.repository';
import { University } from './entities/university.entity';
import { Course, GraduationType, Semester } from './entities/course.entity';
import { Reading } from './entities/reading.entity';

/**
 * Service which connects to the database for university related operations.
 * @author (Paul Dietrich)
 * @version (17.04.2020)
 */
@Injectable()
export class UniversityService {

  constructor(@InjectRepository(UniversityRepository) private universityRepository: UniversityRepository,

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
  async getCoursesOfUniversity(uniId: string): Promise<Course[]> {
    const university = await this.universityRepository.find({ where: { id: uniId}});
    return this.courseRepository.find({ where: { university: university}});
  }

  /**
   * Gets all products of one course of one university.
   * @param courseId - id of the course which is searched
   */
  async getCourseProductsById(courseId: string) {
    return this.courseRepository.getCourseProductsById(courseId);
  }

  /**
   * Gets all products which are read in all courses of the university
   * @param courseId - Id of the course which is searched
   * @param semester - the semester which is searched
   */
  async getSemesterProductsById(courseId: string, semester: Semester) {
    return this.courseRepository.getSemesterProductsById(courseId, semester);
  }

  /**
   * Creates a new university
   * @param name
   * @param town
   */
  async createUniversity(name: string, town: string):Promise<University> {
    return this.universityRepository.createUniversity(name, town);
  }

  /**
   * Creates a new course
   * @param name
   * @param graduation
   * @param universityId
   */
  async createCourse(name: string, graduation: GraduationType, universityId: string) {
    const university = await this.universityRepository.findOne(universityId);
    return await this.courseRepository.createCourse(name, graduation, university);
  }

  /**
   * Creates a new reading in the database.
   * @param semester - the semester in which the product of the reading is read in
   * @param productId - the product of the reading
   * @param courseId - the course in which the product is read in
   */
  async createReading(semester: Semester, productId: string, courseId: string): Promise<Reading> {
    const product = this.productRepository.findOne(productId);
    const course = this.courseRepository.findOne(courseId);
    const reading = new Reading();
    reading.semester = semester;
    reading.product = await product;
    reading.course = await course;
    return reading;
  }
 }
