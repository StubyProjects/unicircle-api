import { IsString, MinLength } from 'class-validator';
export class CreateProductInput {
  @IsString()
  @MinLength(4)
  name: string;

  @IsString()
  description: string;

  @IsString()
  author: string;

  @IsString()
  price: string;

  @IsString()
  image: string;

}

export type UpdateProductInput = Partial<CreateProductInput>;
