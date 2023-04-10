// Import the functions you need from the SDKs you need
// TODO clean up the imports/exports in this file and throughout components so that we are importing most things here just once, and it is more clear what is being imported in indiv. components
import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
import { getStorage } from "firebase/storage"
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/storage'

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWm62aoLErfYsgdciPO5x62G-MRIftmso",
  authDomain: "plant-babies-backend-e9cb5.firebaseapp.com",
  databaseURL: 'https://plant-babies-backend-e9cb5-default-rtdb.firebaseio.com',
  projectId: "plant-babies-backend-e9cb5",
  storageBucket: "plant-babies-backend-e9cb5.appspot.com",
  messagingSenderId: "432383766418",
  appId: "1:432383766418:web:31d07dfb3a41dee8d21b4b",
  measurementId: "G-93CFJBFNTQ"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

// Initialize Firebase
const app = initializeApp(firebaseConfig, {})
export { app, firebase }