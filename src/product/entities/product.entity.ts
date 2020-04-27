import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Index, OneToMany } from 'typeorm';
import { Productlisting } from './productlisting.entity';
import { Review } from '../../review/review.entity';
import { Reading } from '../../university/entities/reading.entity';
import { Author } from './author.entity';
import { Category } from './category.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ fulltext: true })
  @Column()
  title: string;

  @Index({ fulltext: true })
  @Column()
  isbn10: string;

  @Index({ fulltext: true })
  @Column()
  isbn13: string;

  @Index({ fulltext: true })
  @Column()
  description: string;

  @Column()
  listPrice: string;

  @Column()
  imageUrl: string;

  @OneToMany(type => Author, author => author.product)
  authors: Author[];

  @OneToMany(type => Category, category => category.product)
  categories: Category[];

  @OneToMany(type => Productlisting, productListing => productListing.product)
  productListings: Productlisting[];

  @OneToMany(type => Review, review => review.product)
  reviews: Review[];

  @OneToMany(type => Reading, reading => reading.product)
  readings: Reading[];
}
