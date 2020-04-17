import { Entity, Column, PrimaryGeneratedColumn, BaseEntity,ManyToOne } from 'typeorm';
import { IsDate, IsString } from 'class-validator';
import { Product } from '../product/entities/product.entity';
import { User } from '../user/user.entity';

@Entity()
export class Review extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;

  @IsDate()
  @Column()
  createdAt: string;

  @IsString()
  @Column()
  title: string;

  @IsString()
  @Column()
  text: string;

  @IsString()
  @Column()
  rating: string;

  @ManyToOne(type => User, user => user.createdReviews)
  author: User;

  //User (Seller) about who the review is written
  @ManyToOne(type => User, user => user.receivedReviews)
  user: User;

  // OR

  //Product about which the review is written
  @ManyToOne(type => Product, product => product.reviews)
  product: Product;
}
