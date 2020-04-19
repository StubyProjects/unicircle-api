import { EntityRepository, Repository } from 'typeorm';
import { Reading } from '../entities/reading.entity';

@EntityRepository(Reading)
export class ReadingRepository extends Repository<Reading> {

}
