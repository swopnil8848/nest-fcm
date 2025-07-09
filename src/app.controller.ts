// src/app.controller.ts

import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AppService } from './app.service';
import { MultipleDeviceNotificationDto } from './notification/dto/notification.dto';

@Controller()
export class AppController {}
