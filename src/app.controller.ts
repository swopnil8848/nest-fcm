// src/app.controller.ts

import { Controller, Post, Body, BadRequestException } from "@nestjs/common";
import { AppService } from "./app.service";
import {
  MultipleDeviceNotificationDto,
} from "./dto/notification.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("send-notification")
  async sendNotification(
    @Body()
    body: { token: string; title: string; body: string; icon?: string }
  ) {
    return this.appService.sendNotification({
      token: body.token,
      title: body.title,
      body: body.body,
      icon: body.icon,
    });
  }

  @Post("send-multiple-notifications")
  async sendMultipleNotifications(
    @Body() body: MultipleDeviceNotificationDto
  ) {
    return this.appService.sendNotificationToMultipleTokens({
      tokens: body.tokens,
      title: body.title,
      body: body.body,
      icon: body.icon,
    });
  }
}
