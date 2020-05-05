import { IsString } from 'class-validator';

export class CreateUserInput {

  @IsString()
  auth0Id: string;

  @IsString()
  mangoPayId: string;
}

export type PartialUserInput = Partial<CreateUserInput>;
