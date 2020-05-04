import { Module } from '@nestjs/common';
import { MangopayService } from './mangopay.service';
import { MangopayController } from './mangopay.controller';

@Module({
  providers: [MangopayService],
  controllers: [MangopayController],
  exports: [MangopayService]
})
export class MangopayModule {}
