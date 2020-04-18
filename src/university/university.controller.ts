import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UniversityService } from './university.service';
import { Product } from '../product/entities/product.entity';
import { University } from './entities/university.entity';
import { Course } from './entities/course.entity';

/**
 * Controller API which handles requests from the client related to university stuff.
 * @author (Paul Dietrich)
 * @version (18.04.2020)
 */
@Controller('university')
export class UniversityController {

  constructor(private universityService: UniversityService) {}

  /**
   * returns all universities in the database
   */
  @Get()
  async getUniversities(): Promise<University[]> {
    return this.universityService.getUniversities();
  }

  /**
   * Returns all courses of one university
   * @param uniId - the id of the university
   */
  @Get('/:uniId/courses')
  async getCoursesOfUniversity(@Param('uniId') uniId: string,): Promise<Course[]> {
    return this.universityService.getCoursesOfUniversity(uniId);
  }

  /**
   * Returns all products which are read in one course of a university.
   * @param courseId - id of the course
   */
  @Get('/course/:courseId/products')
  async getCourseProductsById(@Param('courseId') courseId: string) {
    return this.universityService.getCourseProductsById(courseId);
  }

  /**
   * Returns all products which are read in one course of a university in a specific semester.
   * @param courseId - id of the course
   * @param sem - the semester
   */
  @Get('/course/:courseId/semester/:sem/products')
  async getSemesterProductsById(
    @Param('courseId') courseId: string,
    @Param('sem') sem: string) {
    return this.universityService.getSemesterProductsById(courseId, sem);
  }

  /**
   * Creates a new university
   * @param name - name of the university
   * @param town - town the university is in
   */
  @Post('/create')
  async createUniversity(@Body('name') name: string,
                         @Body('town') town: string): Promise<University> {
    return this.universityService.createUniversity(name, town);
  }

  /**
   * Creates a new course
   * @param name
   * @param scienceType
   * @param graduation
   * @param universityId
   */
  @Post('/course/create')
  async createCourse(@Body('name') name: string,
                     @Body('scienceType') scienceType: string,
                     @Body('graduation') graduation: string,
                     @Body('universityId') universityId: string): Promise<Course> {
    return this.universityService.createCourse(name, scienceType,graduation, universityId);
  }
}
