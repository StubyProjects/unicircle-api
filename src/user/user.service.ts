import { HttpService, Injectable } from '@nestjs/common';
import { UpdateUserInput } from './update-user.input';

/**
 * Service which connects to the database for user related operations and also makes calls to the auth0 API.
 * @author (Paul Dietrich)
 * @version (03.05.2020)
 */
@Injectable()
export class UserService {

  constructor(private http: HttpService) {
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

  async updateProfileImage(user, updateUserInput: UpdateUserInput) {

    const token = await this.getAuth0Token();

    const headers = {
      'Authorization': `Bearer ${token}`,
    };

    return await this.http.patch(process.env.AUTH0_API + 'users/' + user.sub, updateUserInput, { headers: headers } ).toPromise();
  }

}