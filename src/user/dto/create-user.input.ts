import { IsBoolean, IsString } from 'class-validator';
import { Semester } from '../../university/entities/course.entity';

export class CreateUserInput {

  @IsString()
  city: string;

  @IsBoolean()
  seller: boolean;

  @IsString()
  semester: Semester;

  @IsString()
  courseId: string;

}

export type UpdateProductInput = Partial<CreateUserInput>;
