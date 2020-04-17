/**
 * Interacts with the readings table in the database.
 * @author (Paul Dietrich)
 * @version (17.04.2020)
 */
import { EntityRepository, Repository } from 'typeorm';
import { Reading } from '../entities/reading.entity';

@EntityRepository(Reading)
export class ReadingRepository extends Repository<Reading> {

}
