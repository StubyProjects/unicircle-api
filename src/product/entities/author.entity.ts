import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, Index } from 'typeorm';
import { WrittenBy } from './written-by.entity';

@Entity()
export class Author extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;

  @Index({ fulltext: true })
  @Column()
  name: string;

  @OneToMany(type => WrittenBy, writing => writing.author)
  writings: WrittenBy[];
}
