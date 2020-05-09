/**
 * Controller for everything related to notifications. Connection to the frontend.
 * Can be called by http://localhost:8000/notification
 * @author (Paul Dietrich)
 * @version (07.05.2020)
 */
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationInput } from './dto/create-notification.input';
import { Notification } from './entities/notification.entity';
import { DeleteResult } from 'typeorm';
import { User } from '../custom-decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserModel } from '../types/user.model';
import { UserNotification } from './entities/userNotification.entity';

@Controller('notification')
export class NotificationController {

  constructor(private notificationService: NotificationService) {
  }


  @UseGuards(AuthGuard('jwt'))
  @Get('/user')
  async getAllUserNotifications(@User()user: UserModel) {
    return this.notificationService.getAllUserNotifications(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createNotification(@Body() createNotificationInput: CreateNotificationInput): Promise<Notification> {
    return this.notificationService.createNotification(createNotificationInput);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/user')
  async createUserNotitfication(
    @User() user: UserModel,
    @Body('notification') notification: Notification): Promise<UserNotification> {
    return this.notificationService.createUserNotification(user, notification);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteNotification(@Param('id') notificationId: string): Promise<DeleteResult> {
    return this.notificationService.deleteNotification(notificationId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/user/:id')
  async softDeleteUserNotification(@Param('id') notificationId: string) {
    return this.notificationService.softDeleteUserNotification(notificationId);
  }
}
