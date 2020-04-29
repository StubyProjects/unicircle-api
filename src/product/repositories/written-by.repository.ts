import { EntityRepository, Repository } from 'typeorm';
import { WrittenBy } from '../entities/written-by.entity';

@EntityRepository(WrittenBy)
export class WrittenByRepository extends Repository<WrittenBy> {

}
