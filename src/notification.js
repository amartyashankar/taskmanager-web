// src/notification.js
import { getToken } from 'firebase/messaging';
import { messaging } from './firebase';

export const requestNotificationPermission = async () => {
  try {
    const token = await getToken(messaging, { vapidKey: 'BMTUlzx7vh_xwHXtJuijPFQwhnG7S8w7UAxUV8VZN3J14jszvHHQnMnW5huk3Bi-RJ8fUkl8C89TYn-PFuLTXa0' });
    if (token) {
      console.log('Notification token:', token);
      // Send this token to your backend for sending notifications
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  } catch (error) {
    console.error('An error occurred while retrieving token. ', error);
  }
};
