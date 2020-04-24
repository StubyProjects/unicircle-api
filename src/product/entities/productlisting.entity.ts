import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Index,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Image } from './image.entity';
import { Condition } from './condition.entity';
import { Product } from './product.entity';
import { IsString } from 'class-validator';
import { Order } from '../../order/order.entity';

@Entity()
export class Productlisting extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ fulltext: true })
  @Column()
  createdAt: string;

  @Index({ fulltext: true })
  @Column()
  price: string;

  @IsString()
  @Column()
  userId: string;

  @ManyToOne(type => Condition, condition => condition.productListing)
  condition: Condition;

  @OneToMany(type => Image, image => image.productListing)
  images: Image[];

  @ManyToOne(type => Product, condition => condition.productListings)
  product: Product;

  // Is NULL until product gets bought
  @ManyToOne(type => Order, order => order.productListings)
  order: Order;
}
