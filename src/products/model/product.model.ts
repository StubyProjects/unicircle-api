import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductModel {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  price: string;

  @Field()
  image: string;
}
