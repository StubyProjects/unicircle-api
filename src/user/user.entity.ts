import { Entity, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne, Column } from 'typeorm';
import { Review } from '../review/review.entity';
import { IsBoolean, IsString } from 'class-validator';
import { University } from '../university/entities/university.entity';
import { Semester } from '../university/entities/course.entity';
import { Productlisting } from '../product/entities/productlisting.entity';

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

  @ManyToOne(type => University, university => university.students)
  university: University;

  @OneToMany(type => Review, review => review.user)
  createdReviews: Review[];

  @OneToMany(type => Review, review => review.user)
  receivedReviews: Review[];

  @OneToMany(type => Productlisting, productListing => productListing.user)
  productListings: Productlisting[];
}
