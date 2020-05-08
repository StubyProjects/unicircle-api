/**
 * Interacts with the userNotification table in the database.
 * @author (Paul Dietrich)
 * @version (16.04.2020)
 */
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { UserNotification } from '../entities/userNotification.entity';
import { UserEntity } from '../../user/user.entity';
import { Notification } from '../entities/notification.entity';

@EntityRepository(UserNotification)
export class UserNotificationRepository extends Repository<UserNotification> {

  /**
   * Generates a new many to many relation between an user an a notification.
   * @param auth0User
   * @param notification - the notification which should be displayed to the user.
   */
  async createUserNotifictaion(auth0User, notification): Promise<UserNotification> {
    const user = await getRepository(UserEntity).findOne(auth0User.sub);
    const userNotification = new UserNotification();
    userNotification.user = user;
    userNotification.notification = notification;
    await userNotification.save();
    return userNotification;
  }

  async deleteUserNotification(userNotificationId) {
    return this.delete(userNotificationId);
  }

  /**
   * Retrieves all notifications the specified user has
   * @param auth0User
   */
  async getAllUserNotifications(auth0User): Promise<UserNotification[]> {
    const user = await getRepository(UserEntity).findOne(auth0User.sub);
    return this.createQueryBuilder("UserNotification")
      .select("UserNotification.notification")
      .where("UserNotification.user = :user", { user: user})
      .getMany();
  }
}
