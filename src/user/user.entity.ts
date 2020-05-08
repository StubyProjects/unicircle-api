import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsString } from 'class-validator';
import { UserNotification } from '../notification/entities/userNotification.entity';

@Entity()
export class UserEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @IsString()
  @Column()
  auth0Id: string;

  @IsString()
  @Column()
  mangoPayId: string;

  @IsString()
  @Column()
  routeId: string;

  @OneToMany(type => UserNotification, userNotification => userNotification.user)
  userNotifications: UserNotification[];
}
