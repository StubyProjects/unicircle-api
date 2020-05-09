/**
 * Interacts with the userNotification table in the database.
 * @author (Paul Dietrich)
 * @version (16.04.2020)
 */
import { EntityRepository, Repository } from 'typeorm';
import { UserNotification } from '../entities/userNotification.entity';
import { InternalServerErrorException } from '@nestjs/common';

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
    userNotification.notification = notification
    userNotification.deleted = false;
    try {
      await userNotification.save();
    } catch (error) {
      if(error.code === 'ER_DUP_ENTRY') {
        console.log('Notification already Exists')
      } else {
        throw new InternalServerErrorException();
      }
    }

    return userNotification;
  }

  async deleteUserNotification(userNotificationId) {
    return this.update(userNotificationId, { deleted: true });
  }

  /**
   * Retrieves all notifications the specified user has
   * @param user
   */
  async getAllUserNotifications(user): Promise<UserNotification[]> {

    return await this.find({
      select: ['id'],
      relations: ['notification'],
      where: {
        userId: user.sub,
        deleted: false
      }
    })
  }
}


