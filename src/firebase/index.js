// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getMessaging, getToken } from "firebase/messaging";
import { getFirestore } from "firebase/firestore";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4oy_jn9XPYNzHh7iWp5WWZHUoREUaWH4",
  authDomain: "fire-shopping-c8165.firebaseapp.com",
  projectId: "fire-shopping-c8165",
  storageBucket: "fire-shopping-c8165.appspot.com",
  messagingSenderId: "468435938894",
  appId: "1:468435938894:web:dd471cb11a972ecb3c1d1f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging();
getToken(messaging, { vapidKey: 'BIkO7EAdeiGjajm7yPaIA842DZ1r7ePWYRQ9NOQ02cYrQ03y5gJJAV7_r31YGXBEEiD4g0lEDJna297IRkEYLzU' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    // ...
    // console.log(currentToken)
    sendTokenToServer(currentToken)
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});

const sendTokenToServer = token => {
  if (localStorage.getItem('tokenSendToServer')) return;
  // TODO: Implementar la logica de que en el servidor se almacene el token
  localStorage.setItem('tokenSendToServer', '1')
}

export const db = getFirestore(app);
