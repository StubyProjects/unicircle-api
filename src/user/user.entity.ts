import { Entity, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne, Column } from 'typeorm';
import { Review } from '../review/review.entity';
import { IsBoolean, IsString } from 'class-validator';
import { University } from '../university/entities/university.entity';
import { Semester } from '../university/entities/reading.entity';

@Entity()
export class User extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsString()
  city: string;

  @Column()
  @IsBoolean()
  seller: boolean;

  @Column()
  @IsString()
  semester: Semester;

  @OneToMany(type => Review, review => review.user)
  createdReviews: Review[];

  @OneToMany(type => Review, review => review.user)
  receivedReviews: Review[];

  @ManyToOne(type => University, university => university.students)
  university: University;

}
