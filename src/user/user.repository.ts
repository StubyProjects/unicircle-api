/**
 * Interacts with the user table in the database.
 * @author (Paul Dietrich)
 * @version (16.04.2020)
 */
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { User } from './user.entity'
import { CreateUserInput } from './dto/create-user.input';
import { Course } from '../university/entities/course.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const { city, seller, semester, courseId } = createUserInput;
    const user = new User();
    user.city = city;
    user.seller = seller;
    user.semester = semester;
    user.course = await getRepository(Course).findOne({ where: { id: courseId}});
    await user.save();
    return user;
  }
}
