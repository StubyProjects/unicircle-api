import { Body, Controller, Get, HttpService, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';

/**
 * User API which handles requests from the client related to the users.
 * @author (Paul Dietrich)
 * @version (17.04.2020)
 */
@Controller('user')
export class UserController {

  constructor(private http: HttpService, private userService: UserService) {}

  /**
   * Finds a user by his id in the auth0 database and then returns him.
   * @param id - id of the user
   */
  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Post('create')
  async createUser(@Body() createUserInput: CreateUserInput): Promise<User> {
    return this.userService.createUser(createUserInput);
  }
}
