import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Index, OneToMany } from 'typeorm';
import { Productlisting } from './productlisting.entity';
import { Review } from '../../review/review.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ fulltext: true })
  @Column()
  title: string;

  @Index({ fulltext: true })
  @Column()
  isbn: string;

  @Index({ fulltext: true })
  @Column()
  description: string;

  @Index({ fulltext: true })
  @Column()
  author: string;

  @Column()
  listPrice: string;

  @Column()
  imageUrl: string;

  @Column()
  category: string;

  @OneToMany(type => Productlisting, productListing => productListing.product)
  productListings: Productlisting[];

  @OneToMany(type => Review, review => review.product)
  reviews: Review[];
}