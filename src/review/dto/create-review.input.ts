import { IsDate, IsString } from 'class-validator';
import { Product } from '../../product/entities/product.entity';
import { User } from '../../user/user.entity';

export class CreateReviewInput {

  @IsDate()
  createdAt: string;

  @IsString()
  title: string;

  @IsString()
  text: string;

  @IsString()
  rating: string;

  product: Product;

  user: User;

}

export type UpdateReviewInput = Partial<CreateReviewInput>;
