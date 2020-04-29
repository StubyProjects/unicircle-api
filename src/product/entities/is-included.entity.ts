import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { Category } from './category.entity';

@Entity()
export class IsIncluded extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(type => Product, product => product.inclusions)
  product: Product;

  @ManyToOne(type => Category, category => category.inclusions)
  category: Category;
}
