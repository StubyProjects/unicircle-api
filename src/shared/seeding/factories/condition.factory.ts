
import { define } from 'typeorm-seeding';
import { Condition, conditionName } from '../../../product/entities/condition.entity';

define(Condition, () => {
  const name: conditionName = 1;
  const description = "Guter Zustand dies das";

  const condition = new Condition();
  condition.name = name;
  condition.description = description;
  return condition;
});
