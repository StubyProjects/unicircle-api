import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Lecture } from '../entities/lecture.entity';
import { UniversityService } from '../university.service';
import { AuthGuard } from '@nestjs/passport';
import { Product } from '../../product/entities/product.entity';
import { Reading } from '../entities/reading.entity';
import { Semester } from '../entities/course.entity';

/**
 * Controller API which handles requests from the client related to lecture stuff.
 * @author (Paul Dietrich)
 * @version (29.04.2020)
 */
@Controller('lecture')
export class LectureController {

  constructor(private universityService: UniversityService) {}

  @Get('/:id/readings')
  async getProductsOfLecture(@Param('id') id: string): Promise<Product[]> {
    return this.universityService.getLectureProductsById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createLecture(
    @Body('name') name: string,
    @Body('courseId') courseId:string): Promise<Lecture> {
    return this.universityService.createLecture(name, courseId);
  }

  /**
   * Creates a new reading in the database. Should be called AFTER(!) the relating lecture and the
   * relating product are created in the database.
   * @param semester
   * @param productId
   * @param lectureId
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('/:lectureId/readings')
  async createReading(@Body('semester') semester: Semester,
                      @Body('productId') productId: string,
                      @Param('lectureId') lectureId: string): Promise<Reading> {
    return this.universityService.createReading(semester, productId, lectureId);
  }
}
