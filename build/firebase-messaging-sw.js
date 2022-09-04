importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyA4oy_jn9XPYNzHh7iWp5WWZHUoREUaWH4",
    authDomain: "fire-shopping-c8165.firebaseapp.com",
    projectId: "fire-shopping-c8165",
    storageBucket: "fire-shopping-c8165.appspot.com",
    messagingSenderId: "468435938894",
    appId: "1:468435938894:web:dd471cb11a972ecb3c1d1f",  
  });

  const messaging = firebase.messaging();

  messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Titulo de la notificación';
    const notificationOptions = {
      body: 'Body del mensaje.',
      icon: 'https://icon2.cleanpng.com/20190529/bwt/kisspng-firebase-cloud-messaging-google-cloud-messaging-ap-5ceed4e6f2d828.4696018515591559429947.jpg'
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });
