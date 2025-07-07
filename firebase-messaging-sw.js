// firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDIx33jqWtoimY-3EcwFXa3EegI2HfEUuo",
  authDomain: "interview-fcm-nest.firebaseapp.com",
  projectId: "interview-fcm-nest",
  storageBucket: "interview-fcm-nest.firebasestorage.app",
  messagingSenderId: "241612629997",
  appId: "1:241612629997:web:26c0b22fd1beef083329e4",
  measurementId: "G-93ZBLLKVEQ"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification?.title || 'Background Message Title';
  const notificationOptions = {
    body: payload.notification?.body || 'Background Message body.',
    icon: '/firebase-logo.png'  // optional icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
