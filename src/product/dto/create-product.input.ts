import { IsArray, IsObject, IsString, MinLength } from 'class-validator';
import { conditionName } from '../../entities/condition.entity';
import { Image } from '../../entities/image.entity';
export class CreateProductInput {
  @IsString()
  @MinLength(4)
  title: string;

  @IsString()
  isbn: string;

  @IsString()
  description: string;

  @IsString()
  author: string;

  @IsString()
  listPrice: string;

  @IsString()
  price: string;

  @IsString()
  imageUrl: string;

  @IsString()
  category: string;

  @IsObject()
  conditionName: conditionName;

  @IsString()
  conditionDescription: string;

  @IsArray()
  images: Array<Image>;

}

export type UpdateProductInput = Partial<CreateProductInput>;
