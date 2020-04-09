import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { NewUserInput } from './dto/new-user.input';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async register(newUserInput: NewUserInput): Promise<User> {
    const { email, password } = newUserInput;

    const user = new User();
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
      return user;
    } catch (error) {
      if(error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('E-Mail already exists')
      } else{
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(newUserInput: NewUserInput): Promise<User> {
    const { email, password } = newUserInput;
    const user = await this.findOne({email});

    if(user && await user.validatePassword(password)) {
      return user;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt)
  }
}
