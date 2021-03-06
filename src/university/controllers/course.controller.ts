import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UniversityService } from '../university.service';
import { Course, GraduationType, Semester } from '../entities/course.entity';
import { Reading } from '../entities/reading.entity';
import { AuthGuard } from '@nestjs/passport';

/**
 * Controller API which handles requests from the client related to course stuff.
 * @author (Paul Dietrich)
 * @version (18.04.2020)
 */
@Controller('course')
export class CourseController {

  constructor(private universityService: UniversityService) {}

  /**
   * Returns all products which are read in one course of a university.
   * @param courseId - id of the course
   */
  @Get('/:courseId/products')
  async getCourseProductsById(@Param('courseId') courseId: string) {
    return this.universityService.getCourseProductsById(courseId);
  }

  /**
   * Returns all products which are read in one course of a university in a specific semester.
   * @param courseId - id of the course
   * @param sem - the semester
   */
  @Get('/:courseId/semester/:sem/products')
  async getSemesterProductsById(
    @Param('courseId') courseId: string,
    @Param('sem') sem: Semester) {
    return this.universityService.getSemesterProductsById(courseId, sem);
  }

  /**
   * Creates a new course. Should only be called AFTER(!) the relating university is created in the database.
   * @param name
   * @param graduation - "BACHELOR" or "MASTER"
   * @param universityId
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async createCourse(@Body('name') name: string,
                     @Body('graduation') graduation: GraduationType,
                     @Body('universityId') universityId: string): Promise<Course> {
    return this.universityService.createCourse(name, graduation, universityId);
  }


}
