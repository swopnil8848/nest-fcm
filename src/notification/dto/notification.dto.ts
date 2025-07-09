// src/dto/notification.dto.ts
import { IsOptional, IsString, IsArray } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';

export class NotificationDto {
  @IsString()
  token: string;

  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsOptional()
  @IsString()
  icon?: string;
}

export class MultipleDeviceNotificationDto extends PickType(NotificationDto, [
  'title',
  'body',
  'icon',
] as const) {
  @IsArray()
  @IsString({ each: true }) // ensures every item in the array is a string
  tokens: string[];
}
