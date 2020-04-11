import { IsString, MinLength } from 'class-validator';
export class CreateProductInput {
  @IsString()
  @MinLength(4)
  name: string;

  @IsString()
  price: string;

  @IsString()
  image: string;

}
