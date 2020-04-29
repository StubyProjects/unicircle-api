import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { WrittenBy } from './written-by.entity';

@Entity()
export class Author extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(type => WrittenBy, writing => writing.author)
  writings: WrittenBy[];
}
