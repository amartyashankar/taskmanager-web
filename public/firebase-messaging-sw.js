importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyBjMMKEXuNnyOb9VLr7l2LZ7QNa3fDtfyU",
    authDomain: "taskmanager-616cf.firebaseapp.com",
    projectId: "taskmanager-616cf",
    storageBucket: "taskmanager-616cf.firebasestorage.app",
    messagingSenderId: "417581340253",
    appId: "1:417581340253:web:77b165330637e423e8dfb4",
    measurementId: "G-J4P76PDSWV"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message: ', payload);

  // Customize notification
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
