/**
 * Interacts with the userNotification table in the database.
 * @author (Paul Dietrich)
 * @version (16.04.2020)
 */
import { EntityRepository, Repository } from 'typeorm';
import { UserNotification } from '../entities/userNotification.entity';

@EntityRepository(UserNotification)
export class UserNotificationRepository extends Repository<UserNotification> {

  /**
   * Generates a new many to many relation between an user an a notification.
   * @param userId
   * @param notification - the notification which should be displayed to the user.
   */
  async createUserNotifictaion(userId, notification): Promise<UserNotification> {

    const userNotification = new UserNotification();
    userNotification.userId = userId;
    userNotification.notification = notification;
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
  async getAllUserNotifications(user): Promise<UserNotification[]> {
    return await this.find({
      relations: ['notification'],
      where: {
        userId: user.sub
      }
    })
  }
}


