import { Module } from '@nestjs/common';
import { MangopayService } from './mangopay.service';

@Module({
  providers: [MangopayService],
  exports: [MangopayService]
})
export class MangopayModule {}