# NestJS Firebase Notification Service

A simple NestJS application for sending Firebase Cloud Messaging (FCM) push notifications. This project was created as a technical assessment for a NestJS interview.

## Setup

1. Install dependencies
```bash
npm install
```

2. Create `.env` file with Firebase credentials
```env
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
NODE_ENV="development" or "production"
```

3. Start the application
```bash
npm run start:dev
```

## API Endpoints

### Send Single Notification
**POST** `/notification/send`

```json
{
  "token": "device-fcm-token",
  "title": "Hello World",
  "body": "This is a test notification",
  "icon": "https://example.com/icon.png"
}
```

### Send Multiple Notifications
**POST** `/notifications/send-multiple-`

```json
{
  "tokens": ["token1", "token2", "token3"],
  "title": "Hello World",
  "body": "This is a test notification",
  "icon": "https://example.com/icon.png"
}
```

## Parameters

- `token` (string, required): FCM device token for single notification
- `tokens` (array, required): Array of FCM device tokens for multiple notifications
- `title` (string, required): Notification title
- `body` (string, required): Notification message
- `icon` (string, optional): Icon URL

## Note

This is a simple demo application for Firebase Cloud Messaging integration with NestJS.