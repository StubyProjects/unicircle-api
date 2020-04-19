/**
 * Interacts with the university table in the database.
 * @author (Paul Dietrich)
 * @version (17.04.2020)
 */
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Course } from '../entities/course.entity';
import { ProductsRepository } from '../../product/repositories/products.repository';

@EntityRepository(Course)
export class CourseRepository extends Repository<Course> {

  /**
   * Makes a call to the database to retrieve all products which are related to a specific course
   * @param courseId - the specified course (it's id)
   */
  async getCourseProductsById(courseId) {
    return getRepository(ProductsRepository)
      .createQueryBuilder("product")
      .innerJoin("product.readings", "reading")
      .where("reading.course.id = :courseId", { courseId: courseId });
  }

  /**
   * Makes a call to the database to retrieve all products which are related to a specific
   * course and also to a specific semester in that course.
   * @param courseId - the id of the course
   * @param semester - the semester (number)
   */
  async getSemesterProductsById(courseId, semester) {

    return getRepository(ProductsRepository)
      .createQueryBuilder("product")
      .innerJoin("product.readings", "reading")
      .where("reading.semester = :semester", { semester: semester})
      .andWhere("reading.course.id = :courseId", { courseId: courseId})
  }

  async createCourse(name, scienceType, graduation, university): Promise<Course> {

    const course = new Course();
    course.name = name;
    course.scienceType = scienceType;
    course.graduation = graduation;
    course.university = university;
    return await this.save(course);
  }
}
