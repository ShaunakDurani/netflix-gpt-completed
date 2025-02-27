// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8zwohWLaa2qcPSJQvAHCUFoeUVM7Pico",
  authDomain: "netflixgpt-304bc.firebaseapp.com",
  projectId: "netflixgpt-304bc",
  storageBucket: "netflixgpt-304bc.firebasestorage.app",
  messagingSenderId: "1067046300170",
  appId: "1:1067046300170:web:ba2ebaaed1679c36a10df3",
  measurementId: "G-GKDW8G6C02",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
