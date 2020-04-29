import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsString } from 'class-validator';
import { University } from './university.entity';
import { IsPartOf } from './is-part-of.entity';

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

  @OneToMany(type => IsPartOf, isPartOf => isPartOf.lecture)
  isPartOf: IsPartOf[];

  @ManyToOne(type => University, university => university.courses)
  university: University;

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
