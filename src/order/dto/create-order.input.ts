import { IsArray, IsString } from 'class-validator';
import { Productlisting } from '../../product/entities/productlisting.entity';

export class CreateOrderInput {

  @IsString()
  date: string;

  @IsString()
  total: string;

  @IsArray()
  productListings: Productlisting[];
}

export type UpdateOrderInput = Partial<CreateOrderInput>;
