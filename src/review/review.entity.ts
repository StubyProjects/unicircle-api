import { Entity, Column, PrimaryGeneratedColumn, BaseEntity,ManyToOne } from 'typeorm';
import { IsDate, IsString } from 'class-validator';
import { Product } from '../product/entities/product.entity';

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

  @IsString()
  @Column()
  authorId: string;

  //User (Seller) about who the review is written
  @IsString()
  @Column()
  userId: string;

  // OR

  //Product about which the review is written
  @ManyToOne(type => Product, product => product.reviews)
  product: Product;
}
