import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { UniversityService } from '../university.service';
import { University } from '../entities/university.entity';
import { Course, GraduationType, Semester } from '../entities/course.entity';
import { Reading } from '../entities/reading.entity';
import { AuthGuard } from '@nestjs/passport';

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
  async getCoursesOfUniversity(@Param('uniId') uniId: string): Promise<Course[]> {
    return this.universityService.getCoursesOfUniversity(uniId);
  }

  /**
   * Creates a new university
   * @param name - name of the university
   * @param town - town the university is in
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async createUniversity(@Body('name') name: string,
                         @Body('town') town: string): Promise<University> {
    return this.universityService.createUniversity(name, town);
  }
}
