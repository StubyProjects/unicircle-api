import { HttpService, Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { PartialUserInput } from './dto/create-user.input';
import { UserNotificationRepository } from '../notification/repositories/userNotification.repository';
import { NotificationRepository } from '../notification/repositories/notification.repository';
import { MangopayService } from '../mangopay/mangopay.service';

/**
 * Service which connects to the database for user related operations and also makes calls to the auth0 API.
 * @author (Paul Dietrich)
 * @version (03.05.2020)
 */
@Injectable()
export class UserService {

  constructor(
    private http: HttpService,
    private mangoPay: MangopayService,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(UserNotificationRepository) private userNotificationRepository: UserNotificationRepository,
    @InjectRepository(NotificationRepository) private notificationRepository: NotificationRepository) {}

    /**
      * completes the user
      * actual user creation happens in the mangopay service
      */
  async createUser(createUserInput: PartialUserInput, user) {
    const { firstName, lastName, birthday, email } = createUserInput;
    const newMangoUser = await this.mangoPay.createUser( {firstName, lastName, birthday, email})

      const auth0UserInput = {
        // eslint-disable-next-line @typescript-eslint/camelcase
        given_name: firstName,
        // eslint-disable-next-line @typescript-eslint/camelcase
        family_name: lastName
      }
      const token = await this.getAuth0Token();
      const headers = {
        'Authorization': `Bearer ${token}`,
      };
      await this.http.patch(process.env.AUTH0_API + 'users/' + user.sub, auth0UserInput, { headers: headers } ).toPromise();

    await this.userNotificationRepository.deleteUserNotification(user)
    return this.userRepository.createUser(newMangoUser, user);
  }

  async getUser(user) {

    const userAuth0 = await this.getAuth0UserById(user.sub);

    const mangoPayId = await this.userRepository.getMangoPayWithAuth0(user);
    const profileIsCompleted = !!mangoPayId;
    let mangoPayUser = null

    if(!profileIsCompleted) {
       const completionNotification = await this.notificationRepository.findOne({ where: { title: "Vervollständige dein Profil"}});
       await this.userNotificationRepository.createUserNotifictaion(user, completionNotification);
    } else {
      mangoPayUser = await this.mangoPay.getUserById(mangoPayId);
    }
    return {
      userAuth0,
      profileIsCompleted,
      mangoPayUser
    }

  }

  async updateProfile(user, updateUserInput: UpdateUserInput) {

    const { firstName, lastName, birthday } = updateUserInput

    const auth0UserInput = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      given_name: firstName,
      // eslint-disable-next-line @typescript-eslint/camelcase
      family_name: lastName
    }
    const token = await this.getAuth0Token();
    const headers = {
      'Authorization': `Bearer ${token}`,
    };
    await this.http.patch(process.env.AUTH0_API + 'users/' + user.sub, auth0UserInput, { headers: headers } ).toPromise();

    const mangoPayId = await this.userRepository.getMangoPayWithAuth0(user);
    await this.mangoPay.updateUser({ firstName, lastName, birthday }, mangoPayId)
  }

  /**
   * Retrieves the bearer token from auth0 and then returns it.
   */
  private async getAuth0Token() {
    const headers = { 'content-type': 'application/json' };

    const body = {
      'client_id': process.env.CLIENTID,
      'client_secret': process.env.CLIENTSECRET,
      'audience': process.env.AUTH0_API,
      'grant_type': 'client_credentials',
    };
    const response = await this.http.post(process.env.AUTH0_TOKEN_DOMAIN, body, { headers: headers }).toPromise();
    return response.data.access_token;
  }
  /**
   * Retrieves the Auth0 user based on its id
   * @param id Auth0 user id
   */
  private async getAuth0UserById(id) {
    const token = await this.getAuth0Token();
    const headers = {
      'Authorization': `Bearer ${token}`,
    };
    const user = await this.http.get(process.env.AUTH0_API + 'users/' + id, { headers: headers }).toPromise();
    return user.data;
  }
}
