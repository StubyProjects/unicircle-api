import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';
@InputType()
export class CreateProductInput {
  @Field()
  @IsString()
  @MinLength(4)
  name: string;

  @Field()
  @IsString()
  price: string;

  @Field()
  @IsString()
  image: string;

}
