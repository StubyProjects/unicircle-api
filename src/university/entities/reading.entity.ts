import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber } from 'class-validator';
import { Product } from '../../product/entities/product.entity';
import { Course } from './course.entity';

@Entity()
export class Reading extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsNumber()
  semester: Semester;

  @ManyToOne(type => Product, product => product.readings)
  product: Product;

  @ManyToOne(type => Course, course => course.readings)
  course: Course;
}

export enum Semester {
  ONE = "1",
  TWO = "2",
  THREE = "3",
  FOUR = "4",
  FIVE = "5",
  SIX = "6"
}
