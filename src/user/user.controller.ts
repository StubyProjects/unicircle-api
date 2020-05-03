import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { UserModel } from '../types/user.model';
import { User } from '../custom-decorators/user.decorator';
import { UpdateUserInput } from './update-user.input';
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

}