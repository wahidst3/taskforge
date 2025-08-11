// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwRStsjYD5-iYmF0gNAUAWS_NtAnbZc1o",
  authDomain: "taskforgeai-1cd26.firebaseapp.com",
  projectId: "taskforgeai-1cd26",
  storageBucket: "taskforgeai-1cd26.firebasestorage.app",
  messagingSenderId: "6332197482",
  appId: "1:6332197482:web:dd037354572ee11f777813",
  measurementId: "G-38FBEPTWCV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const signInAsGuest = () => {
  return signInAnonymously(auth);
};