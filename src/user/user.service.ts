import { HttpService, Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { PartialUserInput } from './dto/create-user.input';

/**
 * Service which connects to the database for user related operations and also makes calls to the auth0 API.
 * @author (Paul Dietrich)
 * @version (03.05.2020)
 */
@Injectable()
export class UserService {

  constructor(private http: HttpService, @InjectRepository(UserRepository) private userRepository: UserRepository) {}

  async createUser(createUserInput: PartialUserInput, user) {
    return this.userRepository.createUser(createUserInput, user);
  }

  async getUser(user) {
    const userAuth0 = await this.getAuth0UserById(user.sub)

    const mangoPayId = await this.userRepository.getMangoPayWithAuth0(user.sub)
    return {
      userAuth0,
      profileIsCompleted: !!mangoPayId
    }

  }

  async updateProfileImage(user, updateUserInput: UpdateUserInput) {

    const token = await this.getAuth0Token();

    const headers = {
      'Authorization': `Bearer ${token}`,
    };

    return await this.http.patch(process.env.AUTH0_API + 'users/' + user.sub, updateUserInput, { headers: headers } ).toPromise();
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
