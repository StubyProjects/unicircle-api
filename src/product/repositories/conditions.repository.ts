import { EntityRepository, Repository } from 'typeorm';
import { Condition } from '../entities/condition.entity';
import {CreateListingInput} from "../dto/create-listing.input";

@EntityRepository(Condition)
export class ConditionsRepository extends Repository<Condition> {

    /**
     * Creates a new condition in the database.
     * @param createListingInput
     */
    async createEntity(createListingInput: CreateListingInput) {
        const { conditionName, conditionDescription } = createListingInput;

        const condition = new Condition();
        condition.name = conditionName;
        condition.description = conditionDescription;
        await this.save(condition);
        return condition;
    }

}
