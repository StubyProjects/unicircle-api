import { IsArray, IsNumber, IsString, MinLength } from 'class-validator';
import { conditionName } from '../entities/condition.entity';
import { Image } from '../entities/image.entity';
export class CreateProductInput {
  @IsString()
  @MinLength(4)
  title: string;

  @IsString()
  isbn10: string;

  @IsString()
  isbn13: string;

  @IsString()
  description: string;

  @IsString()
  author: string;

  @IsString()
  listPrice: string;

  @IsNumber()
  price: number;

  @IsString()
  imageUrl: string;

  @IsString()
  category: string;

  @IsString()
  conditionName: conditionName;

  @IsString()
  conditionDescription: string;

  @IsArray()
  images: Array<Image>;

}

export type UpdateProductInput = Partial<CreateProductInput>;
