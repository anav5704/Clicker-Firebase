import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCUHjneWuraiglHWM3tyA8-5equI4R9cJ4",
  authDomain: "clicker-efa4f.firebaseapp.com",
  projectId: "clicker-efa4f",
  storageBucket: "clicker-efa4f.appspot.com",
  messagingSenderId: "562627723723",
  appId: "1:562627723723:web:56028e168e03b50d1a364e",
  measurementId: "G-VR5YDEZDWX"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
