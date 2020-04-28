import { IsArray, IsNumber, IsString, MinLength } from 'class-validator';
import { conditionName } from '../entities/condition.entity';
import { Image } from '../entities/image.entity';
import { Author } from '../entities/author.entity';
import { Category } from '../entities/category.entity';
export class CreateProductInput {
  @IsString()
  @MinLength(4)
  title: string;

  @IsString()
  subtitle: string;

  @IsString()
  isbn10: string;

  @IsString()
  isbn13: string;

  @IsString()
  description: string;

  @IsArray()
  authors: Array<Author>;

  @IsString()
  publisher: string;

  @IsString()
  listPrice: string;

  @IsNumber()
  price: number;

  @IsString()
  imageUrl: string;

  @IsArray()
  categories: Array<Category>;

  @IsString()
  conditionName: conditionName;

  @IsString()
  conditionDescription: string;

  @IsArray()
  images: Array<Image>;

}

export type UpdateProductInput = Partial<CreateProductInput>;
