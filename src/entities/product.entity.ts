import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Unique, Index } from 'typeorm';

@Entity()
@Unique(['name'])
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ fulltext: true })
  @Column()
  title: string;

  @Index({ fulltext: true })
  @Column()
  isbn: string;

  @Index({ fulltext: true })
  @Column()
  description: string;

  @Index({ fulltext: true })
  @Column()
  author: string;

  @Column()
  listPrice: string;

  @Column()
  imageUrl: string;

  @Column()
  category: string;

}
