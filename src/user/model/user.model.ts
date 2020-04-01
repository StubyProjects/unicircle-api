import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field(type => Int)
  id: number;

  @Field()
  email?: string;

  @Field()
  password?: string;

  @Field(type => Boolean)
  isActive?: boolean;
}
