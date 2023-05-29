// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTa6ccviGAU1dQWDnmcI4exohFsGHYQ3M",
  authDomain: "rotten-orbital.firebaseapp.com",
  projectId: "rotten-orbital",
  storageBucket: "rotten-orbital.appspot.com",
  messagingSenderId: "725065665779",
  appId: "1:725065665779:web:6bdb0d5311ffd699033b86",
  measurementId: "G-2695DZNVHZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);