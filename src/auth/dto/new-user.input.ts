import { InputType, Field } from '@nestjs/graphql';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
@InputType()
export class NewUserInput {
  @Field()
  @IsString()
  @MinLength(6)
  email: string;

  @Field()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    {message:'password too weak'}
    )
  password: string;
}
