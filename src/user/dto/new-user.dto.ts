import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class NewUserDto {
  @Field()
  email: string;

  @Field()
  password: string;
}
