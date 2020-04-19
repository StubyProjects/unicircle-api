/**
 * Interacts with the university table in the database.
 * @author (Paul Dietrich)
 * @version (17.04.2020)
 */
import { EntityRepository, Repository } from 'typeorm';
import { University } from '../entities/university.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseRepository } from './course.repository';

@EntityRepository(University)
export class UniversityRepository extends Repository<University> {

  async createUniversity(name: string, town: string): Promise<University> {

    const university = new University();
    university.name = name;
    university.town = town;
    return await this.save(university);
  }
}
