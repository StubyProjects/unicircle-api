import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsString } from 'class-validator';

@Entity()
export class UserEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @IsString()
  auth0Id: string;

  @IsString()
  mangoPayId: string;

  @IsString()
  routeId: string;
}
