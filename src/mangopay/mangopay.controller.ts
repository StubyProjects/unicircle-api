import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MangopayService } from './mangopay.service';
import { CreateMangouserInput } from './dto/create-mangouser.input';
import { CreateBankAccountInput } from './dto/createBankAccountInput';

@Controller('mangopay')
export class MangopayController {

  constructor(private MangoPayService: MangopayService) {}

  @Get('/:id')
  async getUserById(@Param('id')id: string) {
    return this.MangoPayService.getUserById(id);
  }

  @Get('/:userId/emoney')
  async getEmoneyOfUser(@Param('userId')userId: string) {
    return this.MangoPayService.getEMoney(userId);
  }

  @Post()
  async createUser(@Body() createMangoUserInput: CreateMangouserInput) {
    return this.MangoPayService.createUser(createMangoUserInput);
  }

  @Post('bankAccount')
  async createBankAccount(@Body() createBankAccountInput: CreateBankAccountInput) {
    return this.MangoPayService.createBankAccount(createBankAccountInput);
  }
}
