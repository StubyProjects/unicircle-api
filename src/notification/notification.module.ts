import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationRepository } from './repositories/notification.repository';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { UserNotificationRepository } from './repositories/userNotification.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationRepository, UserNotificationRepository]),
  ],
  providers: [
    NotificationService
  ],
  controllers: [NotificationController]
})
export class NotificationModule {}
