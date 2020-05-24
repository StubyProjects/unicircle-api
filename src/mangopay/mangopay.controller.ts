import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { MangopayService } from './mangopay.service';
import { CreateMangouserInput } from './dto/create-mangouser.input';
import { CreateBankAccountInput } from './dto/createBankAccountInput';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../custom-decorators/user.decorator';
import { UserEntity } from '../user/user.entity';
import * as MangoPay from 'mangopay2-nodejs-sdk';
import CardType = MangoPay.card.CardType;


@Controller('mangopay')
export class MangopayController {

  constructor(private MangoPayService: MangopayService) {}

  @Get('/:id')
  async getUserById(@Param('id')id: string) {
    return this.MangoPayService.getUserById(id);
  }

  @Get('/:userId/emoney')
  async getEmoneyOfUser(@Param('userId') userId: string) {
    return this.MangoPayService.getEMoney(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/transfer')
  async transferMoney(
    @Body('sellerId') sellerId: string,
    @Body('buyerId') buyerId: string,
    @Body('amount') amount: string) {
    return this.MangoPayService.transferMoney(sellerId, buyerId, amount);
  }

   @Patch('/guest/payIn')
   async guestPayInCardWeb(
     @User() buyer: UserEntity,
     @Body('amount') amount: string,
     @Body('seller') seller: UserEntity,
     @Body('cardType') cardType: CardType) {
     return this.MangoPayService.guestPayInMoneyCardWeb(amount, buyer, seller, cardType);
   }

  @Post('/guest')
  async createGuestUser(@Body() createMangoUserInput: CreateMangouserInput) {
    return this.MangoPayService.createGuestUser(createMangoUserInput);
  }

  @Post('bankAccount')
  async createBankAccount(@Body() createBankAccountInput: CreateBankAccountInput) {
    return this.MangoPayService.createBankAccount(createBankAccountInput);
  }
}
