import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsString } from 'class-validator';
import { University } from './university.entity';
import { Product } from '../../product/entities/product.entity';
import { Reading } from './reading.entity';

@Entity()
export class Course extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;

  @IsString()
  @Column()
  name: string;

  @IsString()
  @Column()
  graduation: GraduationType;

  @ManyToOne(type => University, university => university.courses)
  university: University;

  @OneToMany(type => Reading, reading => reading.course)
  readings: Reading[];
}

export enum GraduationType {
  BACHELOR = "BACHELOR",
  MASTER = "MASTER"
}

export enum Semester {
  ONE = "1",
  TWO = "2",
  THREE = "3",
  FOUR = "4",
  FIVE = "5",
  SIX = "6"
}
