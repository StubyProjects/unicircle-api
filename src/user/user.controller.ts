import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { UserModel } from '../types/user.model';
import { User } from '../custom-decorators/user.decorator';
import { PartialUserInput } from './dto/create-user.input';
import { UserEntity } from './user.entity';
import { UpdateUserInput } from './dto/update-user.input';
/**
 * User API which handles requests from the client related to the users.
 * @author (Paul Dietrich)
 * @version (17.04.2020)
 */
@Controller('user')
export class UserController {

  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Patch('updatePicture')
  async updateProfileImage(
    @User() user: UserModel,
    @Body() updateUserInput: UpdateUserInput) {
    await this.userService.updateProfileImage(user, updateUserInput);
  }

  /**
   * Creates a new user
   * @param createUserInput - the mangoPayId of the user
   * @param user - the auth0 user
   */
  @UseGuards(AuthGuard('jwt'))
  async createUser(@Body() createUserInput: PartialUserInput, @User() user: UserEntity) {
    return this.userService.createUser(createUserInput, user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUser (
    @User() user: UserEntity
  ) {
    return await this.userService.getUser(user);
  }
}
