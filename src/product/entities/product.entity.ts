import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Index, OneToMany } from 'typeorm';
import { Productlisting } from './productlisting.entity';
import { Review } from '../../review/review.entity';
import { Reading } from '../../university/entities/reading.entity';
import { IsIncluded } from './is-included.entity';
import { WrittenBy } from './written-by.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ fulltext: true })
  @Column()
  title: string;

  @Index({ fulltext: true })
  @Column()
  subtitle: string;

  @Index({ fulltext: true })
  @Column()
  isbn10: string;

  @Index({ fulltext: true })
  @Column()
  isbn13: string;

  @Index({ fulltext: true })
  @Column({ length: 500 })
  description: string;

  @Column()
  listPrice: string;

  @Column()
  imageUrl: string;

  @Column()
  publisher: string;

  // refers to the many to many table "writtenBy" between author and product.
  @OneToMany(type => WrittenBy, writtenBy => writtenBy.product)
  writtenBy: WrittenBy[];

  // refers to the many to many table "IsIncluded" between category and product.
  @OneToMany(type => IsIncluded, isIncluded => isIncluded.product)
  inclusions: IsIncluded[];

  @OneToMany(type => Productlisting, productListing => productListing.product)
  productListings: Productlisting[];

  @OneToMany(type => Review, review => review.product)
  reviews: Review[];

  @OneToMany(type => Reading, reading => reading.product)
  readings: Reading[];
}
