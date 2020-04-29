import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { Author } from './author.entity';

@Entity()
export class WrittenBy extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(type => Product, product => product.inclusions)
  product: Product;

  @ManyToOne(type => Author, author => author.writings)
  author: Author;
}
