// src/app.module.ts

import { Module, ValidationPipe } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { config } from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { APP_PIPE } from '@nestjs/core';

config();

@Module({
  imports: [NotificationModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: (process.env.FIREBASE_PRIVATE_KEY as string).replace(
          /\\n/g,
          '\n',
        ),
      }),
    });
  }
}
