import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/user.entity';
import { Notification } from './notification.entity';
import { IsObject } from 'class-validator';

/**
 * Many To Many Relation between User and Notification.
 */
@Entity()
export class UserNotification extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(type => UserEntity, user => user.userNotifications)
  user: UserEntity;

  @ManyToOne(type => Notification, notification => notification.userNotifications)
  notification: Notification;

}
