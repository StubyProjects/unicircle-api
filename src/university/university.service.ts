import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UniversityRepository } from './repositories/university.repository';
import { ReadingRepository } from './repositories/reading.repository';
import { CourseRepository } from './repositories/course.repository';
import { ProductsRepository } from '../product/repositories/products.repository';
import { Product } from '../product/entities/product.entity';

/**
 * Service which connects to the database for university related operations.
 * @author (Paul Dietrich)
 * @version (17.04.2020)
 */
@Injectable()
export class UniversityService {

  constructor(@InjectRepository(UniversityRepository) private universityRepository: UniversityRepository,

              @InjectRepository(ReadingRepository) private readingRepository: ReadingRepository,

              @InjectRepository(CourseRepository) private courseRepository: ReadingRepository,

              @InjectRepository(ProductsRepository) private productRepository: ProductsRepository) {}

  /**
   * Gets all products which are read in all courses of the university
   * @param id - id of the university
   */
  async getProductsById(id): Promise<Product[]> {
    const products = [];
    const courses =  await this.courseRepository.find({ where: { university: id}});

    for (const course of courses) {
      const readings = await this.readingRepository.find({ where: { course: course}});

      for (const reading of readings) {
        const readingProducts = await this.productRepository.find({ where: { id: reading.product}});
        products.push(readingProducts);
      }
    }
    return [...new Set(products)];
  }

  /**
   * Gets all products of all courses of one university but from a specific semester
   * @param id - the id of the university
   * @param semester - the semester which is searched
   */
  async getSemesterProductsById(id, semester) {
    const products = await this.getProductsById(id);
    return products.filter(product => product.readings.filter(reading => reading.semester = semester));
  }

  /**
   * Gets all products of one courses of one university.
   * @param id - the id of the university
   * @param course - the course which is searched
   */
  async getCourseProductsById(id, course) {
    const products = await this.getProductsById(id);
    return products.filter(product => product.readings.filter(reading => reading.course.name = course));
  }
 }
