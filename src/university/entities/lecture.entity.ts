import { Reading } from './reading.entity';
import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsString } from 'class-validator';
import { IsPartOf } from './is-part-of.entity';

@Entity()
export class Lecture extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @Index({ fulltext: true })
  @IsString()
  @Column()
  name: string;

  @OneToMany(type => Reading, reading => reading.lecture)
  readings: Reading[];

  @OneToMany(type => IsPartOf, isPartOf => isPartOf.lecture)
  isPartOf: IsPartOf[];

}
