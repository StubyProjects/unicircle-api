/**
 * Interacts with the university table in the database.
 * @author (Paul Dietrich)
 * @version (17.04.2020)
 */
import { EntityRepository, Repository } from 'typeorm';
import { University } from '../entities/university.entity';

@EntityRepository(University)
export class UniversityRepository extends Repository<University> {

}
