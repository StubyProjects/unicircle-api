import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { NewUserInput } from './dto/new-user.input';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { TokenModel } from './model/token.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository,
    private jwtService: JwtService
  ) {
  }

  async register(newUserInput: NewUserInput): Promise<User> {
    return this.usersRepository.register(newUserInput);
  }

  async login(newUserInput: NewUserInput): Promise<TokenModel> {
    {
      const user = await this.usersRepository.validateUserPassword(newUserInput);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const email = user.email;

      const payload: JwtPayload = { email };
      const accessToken = await this.jwtService.sign(payload);

      return {accessToken};
    }
  }
}
