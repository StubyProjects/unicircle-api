import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsString } from 'class-validator';
import { Course } from './course.entity';

@Entity()
export class University extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;

  @Index({ fulltext: true })
  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  town: string;

  @OneToMany(type => Course, course => course.university)
  courses: Course[];
}
