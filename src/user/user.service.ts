import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { response } from 'express';

/**
 * Service which connects to the database for user related operations and also makes calls to the auth0 API.
 * @author (Paul Dietrich)
 * @version (17.04.2020)
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


  /**
   * Fetches the user data by his id from the auth0 API.
   * @param id - id of the user
   */
  async getUserById(id) {
    const token = await this.getAuth0Token();
    const headers = {
      'Authorization': `Bearer ${token}`,
    };
    const user = await this.http.get(process.env.AUTH0_API + 'users/' + id, { headers: headers }).toPromise();
    return user.data;
  }
}
