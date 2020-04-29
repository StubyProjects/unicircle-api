import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsString } from 'class-validator';
import { Course, Semester } from './course.entity';
import { Product } from '../../product/entities/product.entity';
import { Lecture } from './lecture.entity';

@Entity()
export class Reading extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;

  @IsString()
  @Column()
  semester: Semester;

  @ManyToOne(type => Lecture, lecture => lecture.readings)
  lecture: Lecture;

  @ManyToOne(type => Product, product => product.readings)
  product: Product; 
}
