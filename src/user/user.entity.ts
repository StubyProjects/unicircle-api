import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsString } from 'class-validator';

@Entity()
export class UserEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @IsString()
  @Column()
  auth0Id: string;

  @IsString()
  @Column()
  mangoPayId: string;

  @IsString()
  @Column()
  routeId: string;
}
