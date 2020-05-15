export class CreateMangouserInput {
  firstName: string;
  lastName: string;
  birthday: number;
  email: string;
}

export type CreateGuestUser = Partial<CreateMangouserInput>;
