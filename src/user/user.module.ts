import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

@Module({ imports: [
    TypeOrmModule.forFeature([UserRepository]),
    HttpModule
  ],
  providers: [
    UserService,
  ],
  controllers: [UserController],})
export class UserModule {}
