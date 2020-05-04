import { Injectable } from '@nestjs/common';
import MangoPay from 'mangopay2-nodejs-sdk';
import * as dotenv from 'dotenv';
import { CreateMangouserInput } from './dto/create-mangouser.input';
import { CreateBankAccountInput } from './dto/createBankAccountInput';

dotenv.config();

@Injectable()
export class MangopayService {

  private static getClient() {
    const validConfig: MangoPay.Config = {
      clientId: process.env.MANGO_CLIENT_ID,
      clientApiKey: process.env.MANGOPAY_API_SANDBOX
    };

    return new MangoPay(validConfig);
  }

  /**
   * Creates a new natural user in the MangoPay backend.
   * @param createMangoUserInput - the data about the user
   */
  async createUser(createMangoUserInput: CreateMangouserInput) {
   const { firstName, lastName, address, birthday, occupation,
     email,} = createMangoUserInput;

    await MangopayService.getClient().Users.create({
      "FirstName": firstName,
      "LastName": lastName,
      "Address": address,
      "Birthday": birthday,
      "Nationality": "DE",
      "CountryOfResidence": "DE",
      "Occupation": occupation,
      "PersonType": "NATURAL",
      "Email": email,
      "Tag": "tag",
    }, async user => {
      await MangopayService.getClient().Wallets.create({
        Owners: [ user.Id ],
        Description: "create wallet for user " + user,
        Currency: "EUR",
      }).then(wallet => {
          console.log("Wallet successfully created ", wallet)
        });
      return user;
    });
  }

  /**
   * creates a new bank account for a specific user and stores it in the mangoPay backend.
   * @param createBankAccountInput - data of the user and the bank account
   */
  async createBankAccount(createBankAccountInput: CreateBankAccountInput) {
    const { ownerId, bankAccount } = createBankAccountInput;

    await MangopayService.getClient().Users.createBankAccount(ownerId, bankAccount, response => {
      console.log(response);
    })
  }

  /**
   * Retrieves a user from the mangoPay backend by its id.
   * @param userId - id of the user
   */
  async getUserById(userId) {
    let user = "";
    await MangopayService.getClient().Users.getNatural(userId,  response => {
      user = response;
    });
    return user;
  }

  /**
   * Retrieves the money a specific user has in his e-wallet.
   * @param userId - the id of the user
   */
  async getEMoney(userId) {
    let eMoney = 0;
    await MangopayService.getClient().Users.getEMoney(userId, res => {
      eMoney = res;
    });
    return eMoney;
  }
}
