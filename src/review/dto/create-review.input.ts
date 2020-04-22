import { IsDate, IsString } from 'class-validator';
import { Product } from '../../product/entities/product.entity';

export class CreateReviewInput {

  @IsString()
  createdAt: string;

  @IsString()
  title: string;

  @IsString()
  text: string;

  @IsString()
  rating: string;

  product: Product;

  @IsString()
  userId: string;

}

export type UpdateReviewInput = Partial<CreateReviewInput>;
