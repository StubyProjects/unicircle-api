/**
 * Controller for everything related to notifications. Connection to the frontend.
 * Can be called by http://localhost:8000/notification
 * @author (Paul Dietrich)
 * @version (07.05.2020)
 */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationInput } from './dto/create-notification.input';
import { Notification } from './notification.entity';

@Controller('notification')
export class NotificationController {

  constructor(private notificationService: NotificationService) {}

  @Get('/:title')
  async getNotification(@Param('title') title: string): Promise<Notification> {
    return this.notificationService.getNotification(title);
  }

  @Post()
  async createNotification(@Body() createNotificationInput: CreateNotificationInput): Promise<Notification> {
    return this.notificationService.createNotification(createNotificationInput);
  }
}
