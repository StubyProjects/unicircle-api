import { IsObject, IsString } from 'class-validator';

export class CreateNotificationInput {

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsObject()
  action: Action;
}

export type UpdateOrderInput = Partial<CreateNotificationInput>;

export class Action {
  url: string;
  text: string;
}
