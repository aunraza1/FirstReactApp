import firebase from 'firebase/app'
import 'firebase/database'


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBjWBWD6SZR_Xm_tKM7GUhduXR87UByLu8",
    authDomain: "father-and-sons-f0e94.firebaseapp.com",
    databaseURL: "https://father-and-sons-f0e94-default-rtdb.firebaseio.com",
    projectId: "father-and-sons-f0e94",
    storageBucket: "father-and-sons-f0e94.appspot.com",
    messagingSenderId: "115020051800",
    appId: "1:115020051800:web:7824023fd81a4f6fc0e12d"
  };
  // Initialize Firebase
 export default firebase.initializeApp(firebaseConfig);