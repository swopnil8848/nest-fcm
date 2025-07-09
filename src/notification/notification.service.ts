import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import {
  MultipleDeviceNotificationDto,
  NotificationDto,
} from './dto/notification.dto';

@Injectable()
export class NotificationService {
  async sendNotification({ token, title, body, icon }: NotificationDto) {
    try {
      //   throw Error('test error');

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
    } catch (error) {
      const errormessage = error.message || 'failed to send notification';
      throw new BadRequestException(errormessage);
    }
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

    try {
      const response = await admin.messaging().sendEachForMulticast(message);
      Logger.log('Successfully sent messages:', response);
      return {
        success: true,
        message: `Successfully sent ${response.successCount} messages; ${response.failureCount} failed.`,
      };
    } catch (error) {
      const errormessage = error.message || 'failed to send notification';
      throw new BadRequestException(errormessage);
    }
  }
}
