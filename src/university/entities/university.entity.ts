import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/user.entity';
import { IsString } from 'class-validator';
import { Course } from './course.entity';

@Entity()
export class University extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  town: string;

  @OneToMany(type => Course, course => course.university)
  courses: Course[];
}
