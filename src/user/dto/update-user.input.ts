import { IsNumber, IsString } from 'class-validator';

export class UserInput {
  @IsString()
  picture: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  birthday: number;
}
export type UpdateUserInput = Partial<UserInput>;