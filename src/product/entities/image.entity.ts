import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';
import { Productlisting } from './productlisting.entity';

@Entity()
export class Image extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  imageUrl: string;

  @ManyToOne(type => Productlisting, productlisting => productlisting.images)
  productListing: Productlisting;
}
