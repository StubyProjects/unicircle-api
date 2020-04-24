import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
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

  //total price of the order
  @IsNumber()
  @Column()
  total: number;

  //all productListings which are included into the order
  @OneToMany(type => Productlisting, productListing => productListing.order)
  productListings: Productlisting[];
}
