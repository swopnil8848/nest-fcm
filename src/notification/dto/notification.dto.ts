// src/dto/notification.dto.ts

import { PickType } from "@nestjs/mapped-types";

export class NotificationDto {
  token: string;
  title: string;
  body: string;
  icon?: string;
}

export class MultipleDeviceNotificationDto extends PickType(NotificationDto, [
  "title",
  "body",
  "icon",
]) {
  tokens: string[];
}