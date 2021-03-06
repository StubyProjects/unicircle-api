import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, Index } from 'typeorm';
import { IsIncluded } from './is-included.entity';

@Entity()
export class Category extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;

  @Index({ fulltext: true })
  @Column()
  title: string;

  @OneToMany(type => IsIncluded, isIncluded => isIncluded.category)
  inclusions: IsIncluded[];
}
