import { HttpModule, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserNotificationRepository } from '../notification/repositories/userNotification.repository';
import { NotificationRepository } from '../notification/repositories/notification.repository';
import { MangopayModule } from '../mangopay/mangopay.module';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([UserRepository, UserNotificationRepository, NotificationRepository]),
    MangopayModule
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
