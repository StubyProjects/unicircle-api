import { EntityRepository, Repository } from 'typeorm';
import { Condition } from '../entities/condition.entity';
import {CreateProductInput} from "../dto/create-product.input";

@EntityRepository(Condition)
export class ConditionsRepository extends Repository<Condition> {

    /**
     * Creates a new condition in the database.
     * @param createProductInput -  attributes of the product which are needed to create the condition.
     */
    async createCondition(createProductInput: CreateProductInput) {
        const { conditionName, conditionDescription } = createProductInput;

        const condition = new Condition();
        condition.name = conditionName;
        condition.description = conditionDescription;
        await this.save(condition);
        return condition;
    }

}
