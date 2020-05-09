import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Notification } from '../../../notification/entities/notification.entity';

export default class CreateNotification implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Notification)().create();
  }
}
