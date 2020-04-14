import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Condition extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: conditionName;

  @Column()
  description: string;
}

export enum conditionName {
  NEU = "NEU",
  GUT = "GUT",
  USED = "GEBRAUCHT"
}
