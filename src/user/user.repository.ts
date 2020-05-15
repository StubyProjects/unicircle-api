import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { PartialUserInput } from './dto/create-user.input';

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
    user.routeId = Math.floor(Math.random()* 1000) + mangoPayId;
    if(mangoPayId !== undefined) {
      user.mangoPayId = mangoPayId;
    }
    await user.save();
    return user;
  }

  /**
   * Retrieves a user by its id.
   * @param auth0user
   */
  async getMangoPayWithAuth0(auth0user) {
    const user = await this.findOne({ auth0Id: auth0user.sub });
    if(user) {
      return user.mangoPayId;
    }
  }
}
