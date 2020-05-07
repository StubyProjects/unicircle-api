/**
 * Interacts with the order table in the database.
 * @author (Paul Dietrich)
 * @version (16.04.2020)
 */
import { EntityRepository, Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { CreateNotificationInput } from './dto/create-notification.input';

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
    notification.action = action;
    await notification.save();
    return notification;
  }
}
