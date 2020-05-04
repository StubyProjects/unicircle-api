import * as MangoPay from 'mangopay2-nodejs-sdk';
import BankAccount = MangoPay.models.BankAccount;

export class CreateBankAccountInput {
  ownerId: string;
  bankAccount: BankAccount;
}
