import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Image extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  imageUrl: string;

  @Column()
  productListingID: string;
}
