import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationRepository } from './notification.repository';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationRepository]),
  ],
  providers: [
    NotificationService,
  ],
  controllers: [NotificationController],
})
export class NotificationModule {}
