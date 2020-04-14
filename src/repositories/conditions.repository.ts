import { EntityRepository, Repository } from 'typeorm';
import { Condition } from '../entities/condition.entity';

@EntityRepository(Condition)
export class ConditionsRepository extends Repository<Condition> {

}
