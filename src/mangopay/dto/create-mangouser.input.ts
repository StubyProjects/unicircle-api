export class CreateMangouserInput {
  firstName: string;
  lastName: string;
  birthday: number;
  email: string;
}
export type UpdateMangoUser = Partial<CreateMangouserInput>;
export type CreateGuestUser = Partial<CreateMangouserInput>;
