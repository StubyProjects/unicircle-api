import { Semester } from '../../university/entities/course.entity';
import { IsString } from 'class-validator';

export class GetProductsFilterDto {

  @IsString()
  university: string;

  @IsString()
  course: string;

  @IsString()
  lecture: string;

  semester: Semester;
}

export type PartialProductFilter = Partial<GetProductsFilterDto>;
