import { define } from 'typeorm-seeding';
import { Condition } from '../../../product/entities/condition.entity';

define(Condition, () => {
  const name = "Neu";
  const description = "Guter Zustand dies das";

  const condition = new Condition();
  condition.name = name;
  condition.description = description;
  return condition;
});
