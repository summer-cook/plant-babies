// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
import { getStorage } from "firebase/storage"

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
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, {})
export const database = getDatabase(app)
export const storage = getStorage(app)