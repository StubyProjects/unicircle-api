import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { NewUserDto } from './dto/new-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneById(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async register(input: NewUserDto): Promise<User> {
    const newRegisteredUser = new User();

    newRegisteredUser.email = input.email;
    newRegisteredUser.password = input.password;

    await this.usersRepository.save(newRegisteredUser);

    return newRegisteredUser;
  }

}
