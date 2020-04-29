/**
 * Interacts with the university table in the database.
 * @author (Paul Dietrich)
 * @version (17.04.2020)
 */
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Course, GraduationType, Semester } from '../entities/course.entity';
import { University } from '../entities/university.entity';
import { Product } from '../../product/entities/product.entity';

@EntityRepository(Course)
export class CourseRepository extends Repository<Course> {

  /**
   * Makes a call to the database to retrieve all products which are related to a specific course
   * @param courseId - the specified course (it's id)
   */
  async getCourseProductsById(courseId:string) {
    return getRepository(Product)
      .createQueryBuilder("product")
      .innerJoin("product.readings", "reading")
      .innerJoin("reading.lecture", "lecture")
      .innerJoin("lecture.isPartOf", "isPartOf")
      .where("isPartOf.course.id = :courseId", { courseId: courseId })
      .getMany();
  }

  /**
   * Makes a call to the database to retrieve all products which are related to a specific
   * course and also to a specific semester in that course.
   * @param courseId - the id of the course
   * @param semester - the semester (number)
   */
  async getSemesterProductsById(courseId: string, semester: Semester) {

    return getRepository(Product)
      .createQueryBuilder("product")
      .innerJoin("product.readings", "reading")
      .innerJoin("reading.lecture", "lecture")
      .innerJoin("lecture.isPartOf", "isPartOf")
      .where("reading.semester = :semester", { semester: semester})
      .andWhere("isPartOf.course.id = :courseId", { courseId: courseId})
      .getMany()
  }

  async createCourse(name:string, graduation: GraduationType, university: University): Promise<Course> {

    const course = new Course();
    course.name = name;
    course.graduation = graduation;
    course.university = university;
    return await this.save(course);
  }
}
