// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
//!Do not share firebase config publicly/online
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhNvYnxyEFuKoUP7XabHgTls2BsJvMZWI",
  authDomain: "email-password-auth-d5869.firebaseapp.com",
  projectId: "email-password-auth-d5869",
  storageBucket: "email-password-auth-d5869.firebasestorage.app",
  messagingSenderId: "915040811405",
  appId: "1:915040811405:web:419a07c85724ff2947e5c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);