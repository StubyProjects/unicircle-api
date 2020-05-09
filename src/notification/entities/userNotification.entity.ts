import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Notification } from './notification.entity';
import { IsBoolean, IsString } from 'class-validator';

/**
 * Many To Many Relation between User and Notification.
 */
@Unique(["userId", "notification"])
@Entity()
export class UserNotification extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @IsString()
  @Column()
  userId: string;

  @ManyToOne(type => Notification, notification => notification.userNotifications)
  notification: Notification;

  @IsBoolean()
  @Column()
  deleted: boolean;
}
