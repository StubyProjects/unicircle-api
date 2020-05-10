import { Injectable } from '@nestjs/common';
import MangoPay from 'mangopay2-nodejs-sdk';
import * as dotenv from 'dotenv';
import { CreateGuestUser, CreateMangouserInput } from './dto/create-mangouser.input';
import { CreateBankAccountInput } from './dto/createBankAccountInput';
import { UserService } from '../user/user.service';
import PayIn = MangoPay.models.PayIn;
import Transfer = MangoPay.models.Transfer;
import PayOut = MangoPay.models.PayOut;
import BankAccount = MangoPay.models.BankAccount;
import Wallet = MangoPay.models.Wallet;
import PayInPaymentType = MangoPay.payIn.PayInPaymentType;
import { getRepository } from 'typeorm';
import { UserEntity } from '../user/user.entity';

dotenv.config();

@Injectable()
export class MangopayService {

  constructor(private userService: UserService) {}

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
   * @param auth0User - the auth0User who is creating a new mangoPay profile for himself.
   */
  async createUser(createMangoUserInput: CreateMangouserInput, auth0User) {
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
    }, async user => {
      //Creates a wallet for the new user
      await MangopayService.getClient().Wallets.create({
        Owners: [ user.Id ],
        Description: "create wallet for user " + user,
        Currency: "EUR",
      }).then(wallet => {
          console.log("Wallet successfully created ", wallet)
      });
      //Saves the id of the user in our database
      await this.userService.createUser({ mangoPayId: user.Id }, auth0User);
      return user;
    });
  }

  /**
   * Creates a new guest user in the MangoPay backend
   * so that a customer can also do a fast checkout.
   * @param createMangoUserInput - the data about the user
   */
  async createGuestUser(createMangoUserInput: CreateGuestUser) {
    const { firstName, lastName, address,
      email,} = createMangoUserInput;

    await MangopayService.getClient().Users.create({
      "FirstName": firstName,
      "LastName": lastName,
      "Address": address,
      "Birthday": Math.floor(Math.random()*100),
      "Nationality": "DE",
      "CountryOfResidence": "DE",
      "PersonType": "NATURAL",
      "Email": email,
    }, async user => {
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

  async payInMoney(amount, userId) {
    //await MangopayService.getClient().PayIns.create({}, () => {})
  }

  async payOutMoney(auth0User, amount) {
    const user = await this.userService.getUser(auth0User);
    const userId: any = user.mangoPayId;

    let bankAccount: BankAccount = undefined;
    let wallet = undefined;
    await MangopayService.getClient().Users.getBankAccounts(userId, (res) => {
      bankAccount = res[0];
    });
    await MangopayService.getClient().Users.getWallets(userId, (res) => {
      wallet = res[0];
    });
    await MangopayService.getClient().PayOuts.create({
      AuthorId: userId,
      DebitedFunds: {
        Currency: "EUR",
        Amount: amount
      },
      Fees: {
        Currency: "EUR",
        Amount: 0
      },
      BankAccountId: bankAccount.Id,
      DebitedWalletId: wallet.Owners[0]
    }, () => {
      console.log("Payout from " + wallet + " succeded!");
    })
  }

  /**
   * Transfer money from the wallet of one user to another users wallet.
   * The Marketplace owner gets a provision of 10% of the amount.
   * @param sellerId - id of the user who sold a product to the buyer.
   * @param buyerId - id of the user who bought a product from the seller.
   * @param amount - the price of the product (the money which should be transferred)
   */
  async transferMoney(sellerId, buyerId, amount) {
    let sellerWallet = undefined;
    let buyerWallet = undefined;
    await MangopayService.getClient().Users.getWallets(sellerId, (res) => {
      sellerWallet = res[0];
    });
    await MangopayService.getClient().Users.getWallets(buyerId, (res) => {
      buyerWallet = res;
    });

    await MangopayService.getClient().Transfers.create({
      AuthorId: sellerId,
      DebitedFunds: {
        Currency: "EUR",
        Amount: amount - (amount * 0.1)
      },
      Fees: {
        Currency: "EUR",
        Amount: amount * 0.1
      },
      CreditedWalletId: sellerWallet.Owners[0],
      DebitedWalletId: buyerWallet.Owners[0]
    }, () => {
      console.log("Money successfully transferred from " + buyerWallet + " to " + sellerWallet);
    })
  }
}
