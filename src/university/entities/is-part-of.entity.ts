import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Lecture } from './lecture.entity';
import { Course } from './course.entity';

@Entity()
export class IsPartOf extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(type => Lecture, lecture => lecture.isPartOf)
  lecture: Lecture;

  @ManyToOne(type => Course, course => course.isPartOf)
  course: Course;

}
