import { Entity, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { Review } from '../review/review.entity';

@Entity()
export class User extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;

  @OneToMany(type => Review, review => review.user)
  createdReviews: Review[];

  @OneToMany(type => Review, review => review.user)
  receivedReviews: Review[];
}
