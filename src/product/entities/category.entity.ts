import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Category extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @ManyToOne(type => Product, product => product.categories)
  product: Product;
}
