import { IsString } from 'class-validator';

export class CreateUserInput {

  @IsString()
  auth0Id: string;

  @IsString()
  mangoPayId: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  birthday: number;

  @IsString()
  email: string;
}

export type PartialUserInput = Partial<CreateUserInput>;
