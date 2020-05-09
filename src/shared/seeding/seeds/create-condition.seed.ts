import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Condition } from '../../../product/entities/condition.entity';

export default class CreateNotification implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Condition)().create();
  }
}
