import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { PartialUserInput } from './dto/create-user.input';
import { HttpException } from '@nestjs/common';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

  /**
   * Stores the new user in the database. If there is no mangoPay id, this field is null.
   * @param createUserInput - mangoPay id of the user (optional)
   * @param auth0User - the auth0 user, more specifically his id (user.sub)
   */
  async createUser(createUserInput: PartialUserInput, auth0User) {
    const { mangoPayId } = createUserInput;

    const user = new UserEntity();
    user.auth0Id = auth0User.sub;
    user.routeId = Math.floor(Math.random()* 1000) + user.auth0Id;
    if(mangoPayId !== undefined) {
      user.mangoPayId = mangoPayId;
    }
    await user.save();
    return user;
  }

  /**
   * Retrieves a user by its id.
   * @param id - id of the user.
   */
  async getUser(id) {
    const user = await this.findOne(id);
    if(user) {
      return user;
    }
    else {
      return new HttpException('No user with this id in the database', 400);
    }
  }
}
