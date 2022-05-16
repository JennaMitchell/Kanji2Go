// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

//import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcJKQbGGibuPmKWMsXqqGTTRhJKOWM4oE",

  authDomain: "kanjicards-fa279.firebaseapp.com",

  databaseURL: "https://kanjicards-fa279-default-rtdb.firebaseio.com",

  projectId: "kanjicards-fa279",

  storageBucket: "kanjicards-fa279.appspot.com",

  messagingSenderId: "464240472064",

  appId: "1:464240472064:web:3c5cf3a52b7a99703028e5",

  measurementId: "G-F2FEN7H3D1",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

//const analytics = getAnalytics(app);
const databaseTest = getDatabase(app);

const storage = getStorage(app);
const exportObject = [databaseTest, storage];

export default exportObject;
