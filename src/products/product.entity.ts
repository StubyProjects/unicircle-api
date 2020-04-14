import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Unique, Index } from 'typeorm';

@Entity()
@Unique(['name'])
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ fulltext: true })
  @Column()
  name: string;

  @Index({ fulltext: true })
  @Column()
  description: string;

  @Index({ fulltext: true })
  @Column()
  author: string;

  @Column()
  price: string;

  @Column()
  image: string;

  /* ID of user which owns the book */
  @Column()
  owner: string;
}
