import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsString } from 'class-validator';
import { UserNotification } from './userNotification.entity';
import { Reading } from '../../university/entities/reading.entity';


@Entity()
export class Notification extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;

  @IsString()
  @Column()
  title: string;

  @IsString()
  @Column()
  description: string;

  @IsString()
  @Column()
  url: string;

  @IsString()
  @Column()
  text: string;

  @OneToMany(type => UserNotification, userNotification => userNotification.notification)
  userNotifications: UserNotification[];


}
