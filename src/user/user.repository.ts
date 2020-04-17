/**
 * Interacts with the user table in the database.
 * @author (Paul Dietrich)
 * @version (16.04.2020)
 */
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity'

@EntityRepository(User)
export class UserRepository extends Repository<User> {

}
