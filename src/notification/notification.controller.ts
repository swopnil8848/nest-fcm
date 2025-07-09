import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { NotificationService } from './notification.service';
import {
  NotificationDto,
  MultipleDeviceNotificationDto,
} from './dto/notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('send')
  async sendNotification(@Body() notificationDto: NotificationDto) {
    return this.notificationService.sendNotification(notificationDto);
  }

  @Post('send-multiple')
  async sendMultipleNotifications(
    @Body() multipleNotificationDto: MultipleDeviceNotificationDto,
  ) {
    return this.notificationService.sendNotificationToMultipleTokens(
      multipleNotificationDto,
    );
  }
}
