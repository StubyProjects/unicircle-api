import { IsNumber, IsString } from 'class-validator';
import MangoPay from 'mangopay2-nodejs-sdk';
import AddressData = MangoPay.address.AddressData;

export class UserInput {
  @IsString()
  picture: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  birthday: number;

  Address: AddressData
}
export type UpdateUserInput = Partial<UserInput>;