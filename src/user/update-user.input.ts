import { IsString } from 'class-validator';

export class UserInput {
  @IsString()
  picture: string;
}
export type UpdateUserInput = Partial<UserInput>;