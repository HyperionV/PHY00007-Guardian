// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0ka2Ni_oNRLUuv-zP5jUt4AVACOYYX8g",
  authDomain: "phy00007-guardian.firebaseapp.com",
  databaseURL: "https://phy00007-guardian-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "phy00007-guardian",
  storageBucket: "phy00007-guardian.firebasestorage.app",
  messagingSenderId: "152257878784",
  appId: "1:152257878784:web:6ac321ca0a6862e0f971e5",
  measurementId: "G-08HXJS72Z2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Get a reference to the database service
export const db = getDatabase(app);
export const auth = getAuth(app);
