/**
 * Interacts with the notification table in the database.
 * @author (Paul Dietrich)
 * @version (16.04.2020)
 */
import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { Notification } from '../entities/notification.entity';
import { CreateNotificationInput } from '../dto/create-notification.input';

@EntityRepository(Notification)
export class NotificationRepository extends Repository<Notification> {

  async getNotification(title: string): Promise<Notification> {
    return this.findOne({ where: { title: title}});
  }

  async createNotification(createNotificationInput: CreateNotificationInput): Promise<Notification> {
    const { title, description, action } = createNotificationInput;

    const notification = new Notification();
    notification.title = title;
    notification.description = description;
    notification.url = action.url;
    notification.text = action.text;
    await notification.save();
    return notification;
  }

  async deleteNotification(notificationId): Promise<DeleteResult> {
    return this.delete(notificationId);
  }
}
