import { Injectable } from '@nestjs/common';
import MangoPay from 'mangopay2-nodejs-sdk';
import * as dotenv from 'dotenv';
import { CreateGuestUser, CreateMangouserInput, UpdateMangoUser } from './dto/create-mangouser.input';
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
    const { firstName, lastName, birthday, email } = createMangoUserInput;

     return await MangopayService.getClient().Users.create({
       "FirstName": firstName,
       "LastName": lastName,
       "Birthday": birthday,
       "Nationality": "DE",
       "CountryOfResidence": "DE",
       "PersonType": "NATURAL",
       "Email": email,
     }, async user => {
       //Creates a wallet for the new user
       await MangopayService.getClient().Wallets.create({
         Owners: [user.Id],
         Description: "create wallet for user " + user.FirstName,
         Currency: "EUR",
       }).then(wallet => {
         console.log("Wallet successfully created ", wallet)
       });
       return user;
     });
  }

  /**
   * Updates a natural user in the MangoPay backend.
   * @param updateMangoUser
   * @param mangoPayId
   */
  async updateUser(updateMangoUser: UpdateMangoUser, mangoPayId) {
    const { firstName, lastName, birthday } = updateMangoUser;

    return await MangopayService.getClient().Users.update({
      Id: mangoPayId,
      FirstName: firstName,
      LastName: lastName,
      Birthday: birthday,
      PersonType: "NATURAL"
    }, async user => {
      return user;
    });
  }

  async updateUserAdress(updateMangoUser: UpdateMangoUser, mangoPayId) {
    const { Address } = updateMangoUser;

    return await MangopayService.getClient().Users.update({
      Id: mangoPayId,
      Address,
      PersonType: "NATURAL"
    }, async user => {
      return user;
    });
  }

  /**
   * Creates a new guest user in the MangoPay backend
   * so that a customer can also do a fast checkout.
   * @param createMangoUserInput - the data about the user
   */
  async createGuestUser(createMangoUserInput: CreateGuestUser) {
    const { firstName, lastName, email} = createMangoUserInput;

    await MangopayService.getClient().Users.create({
      "FirstName": firstName,
      "LastName": lastName,
      "Birthday": Math.floor(Math.random()*100),
      "Nationality": "DE",
      "CountryOfResidence": "DE",
      "PersonType": "NATURAL",
      "Email": email,
      "Tag": "GUEST"
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
    return MangopayService.getClient().Users.getNatural(userId,  user => {
      return user
    });
  }

  /**
   * Retrieves the money a specific user has in his e-wallet.
   * @param userId - the id of the user
   */
  async getEMoney(userId) {
    return MangopayService.getClient().Users.getEMoney(userId, res => {
      return res
    });
  }

  /**
   * User pays in money via a Card Web PayIn to the wallet of the seller.
   * @param amount - the price of the product('s) the user buys
   * @param auth0User - the guest user
   * @param creditedUser - the seller
   * @param cardType - the type of the bank card of the buyer
   */
  // async guestPayInMoneyCardWeb(amount, auth0User, creditedUser, cardType) {
  //   const user = await this.userService.getUser(creditedUser);
  //   const userId: any = user.mangoPayId;
  //   let wallet: WalletData = undefined;
  //   await MangopayService.getClient().Users.getWallets(userId, (res) => {
  //     wallet = res[0];
  //   });
  //
  //   const payIn: CreateCardWebPayIn = {
  //     AuthorId: userId,
  //     CardType: cardType,
  //     CreditedWalletId: wallet.Id,
  //     Culture: "DE",
  //     DebitedFunds: {
  //       Currency: "EUR",
  //       Amount: amount
  //     },
  //     ExecutionType: "WEB",
  //     Fees: {
  //       Currency: "EUR",
  //       Amount: 0
  //     },
  //     PaymentType: "CARD",
  //     ReturnURL: "http://localhost:3000/"
  //   };
  //   await MangopayService.getClient().PayIns.create(payIn, (payIn) => {
  //     console.log('payIn ' + payIn + ' to ' + wallet + ' successfully executed.');
  //   });
  // }

  // async payOutMoney(auth0User, amount) {
  //   const user = await this.userService.getUser(auth0User);
  //   const userId: any = user.mangoPayId;
  //
  //   let bankAccount: BankAccount = undefined;
  //   let wallet: WalletData = undefined;
  //   await MangopayService.getClient().Users.getBankAccounts(userId, (res) => {
  //     bankAccount = res[0];
  //   });
  //   await MangopayService.getClient().Users.getWallets(userId, (res) => {
  //     wallet = res[0];
  //   });
  //   await MangopayService.getClient().PayOuts.create({
  //     AuthorId: userId,
  //     DebitedFunds: {
  //       Currency: "EUR",
  //       Amount: amount - (amount * 0.08)
  //     },
  //     Fees: {
  //       Currency: "EUR",
  //       Amount: amount * 0.08
  //     },
  //     BankAccountId: bankAccount.Id,
  //     DebitedWalletId: wallet.Owners[0]
  //   }, () => {
  //     console.log("Payout from " + wallet + " succeded!");
  //   })
  // }

  /**
   * Transfer money from the wallet of one user to another users wallet.
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
      buyerWallet = res[0];
    });

    await MangopayService.getClient().Transfers.create({
      AuthorId: sellerId,
      DebitedFunds: {
        Currency: "EUR",
        Amount: amount,
      },
      Fees: {
        Currency: "EUR",
        Amount: 0
      },
      CreditedWalletId: sellerWallet.Owners[0],
      DebitedWalletId: buyerWallet.Owners[0]
    }, () => {
      console.log("Money successfully transferred from " + buyerWallet + " to " + sellerWallet);
    })
  }
}