import { IsArray, IsNumber, IsString } from 'class-validator';
import { Image } from '../entities/image.entity';
import { Product } from '../entities/product.entity';
export class CreateListingInput {
  @IsString()
  conditionName: string;

  @IsString()
  conditionDescription: string;

  @IsNumber()
  price: number;

  @IsNumber()
  productId: Product;

  @IsArray()
  images: Array<Image>;
}
export type UpdateListingInput = Partial<CreateListingInput>;