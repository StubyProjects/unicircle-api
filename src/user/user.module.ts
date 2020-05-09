import { HttpModule, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserNotificationRepository } from '../notification/repositories/userNotification.repository';
import { NotificationRepository } from '../notification/repositories/notification.repository';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([UserRepository, UserNotificationRepository, NotificationRepository]) ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
