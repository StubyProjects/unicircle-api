import MangoPay from 'mangopay2-nodejs-sdk';
import AddressData = MangoPay.address.AddressData;

export class MangouserInput {
  firstName: string;
  lastName: string;
  birthday: number;
  email: string;
  Address: AddressData;
}
export type CreateMangouserInput = Partial<MangouserInput>;
export type UpdateMangoUser = Partial<MangouserInput>;
export type CreateGuestUser = Partial<MangouserInput>;
