import { Controller } from '@nestjs/common';
import { mangoPay } from './mangopay';

@Controller('mangopay')
export class MangopayController {

  private readonly mangoApi = mangoPay;

  createUser() {
    this.mangoApi.Users.create({
      "FirstName": "Victor",
      "LastName": "Hugo",
      "Address": "1 rue des Misérables, Paris",
      "Birthday": 1300186358,
      "Nationality": "FR",
      "CountryOfResidence": "FR",
      "Occupation": "Writer",
      "IncomeRange": "6",
      "ProofOfIdentity": null,
      "ProofOfAddress": null,
      "PersonType": "NATURAL",
      "Email": "victor@hugo.com",
      "Tag": "custom tag",
    }).then((model) => {
      return model;
    })
  }

}
