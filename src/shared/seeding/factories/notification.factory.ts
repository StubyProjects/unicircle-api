import { Notification } from '../../../notification/entities/notification.entity';
import { define } from 'typeorm-seeding';

define(Notification, () => {
  const title = "Vervollständige dein Profil";
  const description = "Gib mangoPay amk sonst klatschts";
  const url = "/profile";
  const text = "Hier klicken";

  const notification = new Notification();
  notification.title = title;
  notification.description = description;
  notification.url = url;
  notification.text = text;
  return notification;
});
