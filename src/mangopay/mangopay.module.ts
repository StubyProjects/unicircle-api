import { Module } from '@nestjs/common';
import { MangopayService } from './mangopay.service';
import { MangopayController } from './mangopay.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [MangopayService],
  controllers: [MangopayController]
})
export class MangopayModule {}
