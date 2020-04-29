import { EntityRepository, Repository } from 'typeorm';
import { IsPartOf } from '../entities/is-part-of.entity';

@EntityRepository(IsPartOf)
export class IsPartOfRepository extends Repository<IsPartOf> {

}
