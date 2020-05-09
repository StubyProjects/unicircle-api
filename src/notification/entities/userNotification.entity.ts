import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Notification } from './notification.entity';
import { IsString } from 'class-validator';

/**
 * Many To Many Relation between User and Notification.
 */
@Entity()
export class UserNotification extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @IsString()
  @Column()
  userId: string;

  @ManyToOne(type => Notification, notification => notification.userNotifications)
  notification: Notification;
}
