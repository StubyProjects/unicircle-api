import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { UserModel } from './model/user.model'
import { AuthService } from './auth.service'
import { NewUserInput } from './dto/new-user.input';
import { TokenModel } from './model/token.model';

@Resolver(of => UserModel)
export class AuthResolver {
  constructor(
    private authService: AuthService,

  ) {}

  @Query(returns => String)
  hello() {
    return "Hello";
  }

  @Mutation(returns => UserModel)
  async registerUser(@Args('input') newUserInput: NewUserInput) {
    return this.authService.register(newUserInput);
  }

  @Mutation(returns => TokenModel)
  async loginUser(@Args('input') newUserInput: NewUserInput) {
    return this.authService.login(newUserInput);
  }
}
