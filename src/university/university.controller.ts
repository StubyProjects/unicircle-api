import { Controller, Get, Param } from '@nestjs/common';
import { UniversityService } from './university.service';
import { Product } from '../product/entities/product.entity';

/**
 * Controller API which handles requests from the client related to university stuff.
 * @author (Paul Dietrich)
 * @version (17.04.2020)
 */
@Controller('university')
export class UniversityController {

  constructor(private universityService: UniversityService) {}

  /**
   * Returns all products which are read in all courses of the university.
   * @param id - id of the university
   */
  @Get('/:id/products')
  async getProductsById(@Param('id') id: string): Promise<Product[]> {
    return this.universityService.getProductsById(id);
  }

  @Get('/:id/products/semester/:sem')
  async getSemesterProductsById(@Param('id') id: string,@Param('sem') sem: string): Promise<Product[]> {
    return this.universityService.getSemesterProductsById(id, sem);
  }

  @Get('/:id/products/course/:course')
  async getCourseProductsById(@Param('id') id: string,@Param('course') course: string): Promise<Product[]> {
    return this.universityService.getCourseProductsById(id, course);
  }
}
