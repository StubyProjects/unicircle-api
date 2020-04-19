import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsString } from 'class-validator';
import { Course, Semester } from './course.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Reading extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;

  @IsString()
  @Column()
  semester: Semester;

  @ManyToOne(type => Course, course => course.readings)
  course: Course;

  @ManyToOne(type => Product, product => product.readings)
  product: Product;
}
