/**
 * Interacts with the userNotification table in the database.
 * @author (Paul Dietrich)
 * @version (16.04.2020)
 */
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { UserNotification } from '../entities/userNotification.entity';
import { Notification } from '../entities/notification.entity';

@EntityRepository(UserNotification)
export class UserNotificationRepository extends Repository<UserNotification> {

  /**
   * Generates a new many to many relation between an user an a notification.
   * @param user
   * @param notification - the notification which should be displayed to the user.
   */
  async createUserNotifictaion(user, notification): Promise<UserNotification> {

    const userNotification = new UserNotification();
    userNotification.userId = user.sub;
    userNotification.notification = await getRepository(Notification).findOne({ where: { title: notification.title } });
    await userNotification.save();
    return userNotification;
  }

  async deleteUserNotification(userNotificationId) {
    return this.delete(userNotificationId);
  }

  /**
   * Retrieves all notifications the specified user has
   * @param user
   */
  async getAllUserNotifications(user): Promise<Notification[]> {
    return await getRepository(Notification)
      .createQueryBuilder("notification")
      .innerJoin("notification.userNotifications", "userNotification")
      .where("userNotification.userId = :userId", { userId: user.sub })
      .getMany();
  }
}


