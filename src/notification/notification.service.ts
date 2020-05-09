/**
 * Service which interacts with the NotificationRepository and handles everything notification related.
 * @author (Paul Dietrich)
 * @version (07.05.2020)
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationRepository } from './repositories/notification.repository';
import { CreateNotificationInput } from './dto/create-notification.input';
import { Notification } from './entities/notification.entity';
import { UserNotificationRepository } from './repositories/userNotification.repository';
import { UserNotification } from './entities/userNotification.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class NotificationService {

  constructor(@InjectRepository(NotificationRepository)private notificationRepository: NotificationRepository,
              @InjectRepository(UserNotificationRepository)private userNotificationRepository: UserNotificationRepository) {}

  async getAllUserNotifications(user): Promise<Notification[]> {
    return this.userNotificationRepository.getAllUserNotifications(user);
  }

  async createNotification(createNotificationInput: CreateNotificationInput): Promise<Notification> {
    return this.notificationRepository.createNotification(createNotificationInput);
  }

  async createUserNotification(user, notification: Notification): Promise<UserNotification> {
    return this.userNotificationRepository.createUserNotifictaion(user, notification);
  }

  async deleteNotification(notificationId) {
    return this.notificationRepository.deleteNotification(notificationId);
  }

  async deleteUserNotification(notificationId): Promise<DeleteResult> {
    return this.userNotificationRepository.deleteUserNotification(notificationId);
  }
}
