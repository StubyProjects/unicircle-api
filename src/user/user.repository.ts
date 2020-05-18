import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

  /**
   * Stores the new user in the database. If there is no mangoPay id, this field is null.
   * @param newMangoUser
   * @param auth0User - the auth0 user, more specifically his id (user.sub)
   */
  async createUser(newMangoUser, auth0User) {

    const user = new UserEntity();
    user.auth0Id = auth0User.sub;
    user.routeId = Math.floor(Math.random()* 1000) + newMangoUser.Id;
    if(newMangoUser.Id !== undefined) {
      user.mangoPayId = newMangoUser.Id;
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
