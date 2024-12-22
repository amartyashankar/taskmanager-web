// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyBjMMKEXuNnyOb9VLr7l2LZ7QNa3fDtfyU",
    authDomain: "taskmanager-616cf.firebaseapp.com",
    projectId: "taskmanager-616cf",
    storageBucket: "taskmanager-616cf.firebasestorage.app",
    messagingSenderId: "417581340253",
    appId: "1:417581340253:web:77b165330637e423e8dfb4",
    measurementId: "G-J4P76PDSWV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Messaging
const messaging = getMessaging(app);

onMessage(messaging, (payload) => {
    console.log('Foreground message:', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image,
    };
    new Notification(notificationTitle, notificationOptions);
  });


// Export messaging to use in other parts of the app
export { messaging, onMessage };
