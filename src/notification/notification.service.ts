/**
 * Service which interacts with the NotificationRepository and handles everything notification related.
 * @author (Paul Dietrich)
 * @version (07.05.2020)
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationRepository } from './notification.repository';
import { CreateNotificationInput } from './dto/create-notification.input';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationService {

  constructor(@InjectRepository(NotificationRepository)private notificationRepository: NotificationRepository) {}

  async getNotification(title): Promise<Notification> {
    return this.notificationRepository.getNotification(title);
  }

  async createNotification(createNotificationInput: CreateNotificationInput): Promise<Notification> {
    return this.notificationRepository.createNotification(createNotificationInput);
  }
}
