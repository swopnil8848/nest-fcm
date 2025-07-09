import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import {
  MultipleDeviceNotificationDto,
  NotificationDto,
} from './dto/notification.dto';

@Injectable()
export class NotificationService {
  async sendNotification({ token, title, body, icon }: NotificationDto) {
    try {
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
      throw error;
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
      Logger.log('Error sending messages:', error);
      return { success: false, message: 'Failed to send notifications' };
    }
  }
}
