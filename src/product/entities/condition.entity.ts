import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { Productlisting } from './productlisting.entity';

@Entity()
export class Condition extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(type => Productlisting, productListing => productListing.condition)
  productListing: Productlisting[];
}
