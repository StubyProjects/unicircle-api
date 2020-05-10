export class CreateMangouserInput {

  firstName: string;
  lastName: string;
  address: string;
  birthday: number;
  occupation: string;
  email: string;
}

export type CreateGuestUser = Partial<CreateMangouserInput>;
