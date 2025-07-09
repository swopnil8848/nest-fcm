import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import {
  MultipleDeviceNotificationDto,
  NotificationDto,
} from './dto/notification.dto';

@Injectable()
export class NotificationService {
  async sendNotification({ token, title, body, icon }: NotificationDto) {
    const response = await admin.messaging().send({
      token,
      webpush: {
        notification: {
          title,
          body,
          icon,
        },
      },
    });
    
    return response;
  }

  async sendNotificationToMultipleTokens({
    tokens,
    title,
    body,
    icon,
  }: MultipleDeviceNotificationDto) {
    const message = {
      notification: {
        title,
        body,
        icon,
      },
      tokens,
    };

    const response = await admin.messaging().sendEachForMulticast(message);

    Logger.log('Successfully sent messages:', response);

    return {
      success: true,
      message: `Successfully sent ${response.successCount} messages; ${response.failureCount} failed.`,
    };
  }
}
