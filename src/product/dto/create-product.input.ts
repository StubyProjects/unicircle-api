import { IsArray, IsString, MinLength } from 'class-validator';
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

  @IsString()
  imageUrl: string;

  @IsArray()
  categories: Array<Category>;
}
