import { IsArray, IsString } from 'class-validator';
import { Productlisting } from '../../product/entities/productlisting.entity';

export class CreateOrderInput {

  @IsString()
  date: string;

  // Just contains the id of the productListings.
  @IsArray()
  productListingIds: Productlisting[];
}

export type UpdateOrderInput = Partial<CreateOrderInput>;
