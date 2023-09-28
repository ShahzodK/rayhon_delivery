importScripts("https://cdnjs.cloudflare.com/ajax/libs/firebase/10.4.0/firebase-app-compat.min.js");
importScripts("https://cdnjs.cloudflare.com/ajax/libs/firebase/10.4.0/firebase-messaging-compat.min.js");
firebase.initializeApp({
 apiKey: "AIzaSyBQDH7nzOTrbHvPxHf2U5iNe4vnH5Z93Rw",
 authDomain: "rayhon-push-notifications.firebaseapp.com",
 projectId: "rayhon-push-notifications",
 storageBucket: "rayhon-push-notifications.appspot.com",
 messagingSenderId: "370579126482",
 appId: "1:370579126482:web:4046195260aaa0f513d50b",
 measurementId: "G-MST0W3SNMY"
});
const messaging = firebase.messaging();