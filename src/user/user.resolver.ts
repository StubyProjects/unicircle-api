import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { UserModel } from './model/user.model'
import { UserService } from './user.service'
import { NewUserDto } from './dto/new-user.dto';

@Resolver(of => UserModel)
export class UserResolver {
  constructor(
    private userService: UserService,
  ) {}

  @Query(returns => UserModel)
  async user(@Args('id') id: number): Promise<UserModel> {
    return this.userService.findOneById(id);
  }

  @Query(returns => [UserModel])
  async allUsers(): Promise<UserModel[]> {
    return this.userService.findAll();
  }

  @Mutation(returns => UserModel)
  async registerUser(@Args('input') input: NewUserDto): Promise<UserModel> {
    return this.userService.register(input);
  }
}
