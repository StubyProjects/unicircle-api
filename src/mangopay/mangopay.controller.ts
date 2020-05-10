import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { MangopayService } from './mangopay.service';
import { CreateMangouserInput } from './dto/create-mangouser.input';
import { CreateBankAccountInput } from './dto/createBankAccountInput';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../custom-decorators/user.decorator';
import { UserEntity } from '../user/user.entity';

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

  @UseGuards(AuthGuard('jwt'))
  @Patch('/payout')
  async payOutMoney(
    @User() user: UserEntity,
    @Body('amount') amount: string) {
    return this.MangoPayService.payOutMoney(user, amount);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createUser(@Body() createMangoUserInput: CreateMangouserInput, @User() user: UserEntity) {
    return this.MangoPayService.createUser(createMangoUserInput, user);
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
