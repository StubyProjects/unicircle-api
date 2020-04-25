import { Injectable } from '@nestjs/common';
import MangoPay from 'mangopay2-nodejs-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class MangopayService {

  getClient() {
    const validConfig: MangoPay.Config = {
      clientId: process.env.MANGO_CLIENT_ID,
      clientApiKey: process.env.MANGOPAY_API_SANDBOX
    };

    return new MangoPay(validConfig);
  }

}