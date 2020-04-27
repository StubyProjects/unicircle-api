import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Author extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(type => Product, product => product.authors)
  product: Product;
}
