import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reading } from './reading.entity';
import { IsString } from 'class-validator';
import { University } from './university.entity';

@Entity()
export class Course extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;

  @IsString()
  @Column()
  name: string;

  @IsString()
  @Column()
  science_type: string;

  @IsString()
  @Column()
  graduation: GraduationType;

  @ManyToOne(type => University, university => university.courses)
  university: University;

  @OneToMany(type => Reading, reading => reading.product)
  readings: Reading[];
}

export enum GraduationType {
  BACHELOR = "BACHELOR",
  MASTER = "MASTER"
}
