import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Unique, Index } from 'typeorm';

@Entity()
@Unique(['name'])
export class Productlisting extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ fulltext: true })
  @Column()
  createdAt: string;

  @Index({ fulltext: true })
  @Column()
  price: string;

  @Index({ fulltext: true })
  @Column()
  userId: string;

  @Column()
  productId: string;

  @Column()
  conditionId: string;

}
