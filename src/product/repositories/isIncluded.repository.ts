import { EntityRepository, Repository } from 'typeorm';
import { IsIncluded } from '../entities/is-included.entity';

@EntityRepository(IsIncluded)
export class IsIncludedRepository extends Repository<IsIncluded> {

}
