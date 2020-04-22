import { Controller, Get } from '@nestjs/common';
import { ProductService } from '../product.service';

@Controller('conditions')
export class ConditionController {

  constructor(private productService: ProductService) {}

  @Get()
  async getConditions() {
    return this.productService.getConditions()
  }

}