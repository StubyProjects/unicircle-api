import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsString } from 'class-validator';
import { Productlisting } from '../product/entities/productlisting.entity';

@Entity()
export class Order extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;

  @IsString()
  @Column()
  date: string;

  @IsString()
  @Column()
  buyerId: string;

  @IsString()
  @Column()
  total: string;

  @OneToMany(type => Productlisting, productListing => productListing.order)
  productListings: Productlisting[];
}
