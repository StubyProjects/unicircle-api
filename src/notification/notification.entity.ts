import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsArray, IsString } from 'class-validator';
import { Action } from './dto/create-notification.input';

@Entity()
export class Notification extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  action: Action;
}
