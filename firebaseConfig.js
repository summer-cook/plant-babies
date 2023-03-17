import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBKIMO0DcF-2aftPWm9UzWXzQeTCBGmNWU',
  authDomain: 'plant-babies-backend.firebaseapp.com',
  databaseURL: 'https://plant-babies-backend.firebaseio.com',
  projectId: 'plant-babies-backend',
  // storageBucket: 'plant-babies-backend.appspot.com',
  // messagingSenderId: 'sender-id',
  // appId: 'app-id',
  // measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase