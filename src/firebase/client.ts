// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUHjneWuraiglHWM3tyA8-5equI4R9cJ4",
  authDomain: "clicker-efa4f.firebaseapp.com",
  projectId: "clicker-efa4f",
  storageBucket: "clicker-efa4f.appspot.com",
  messagingSenderId: "562627723723",
  appId: "1:562627723723:web:56028e168e03b50d1a364e",
  measurementId: "G-7YW2YG7FRE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);