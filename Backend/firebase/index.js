import { initializeApp } from "firebase/app";
require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "story-pulse.firebaseapp.com",
  projectId: "story-pulse",
  storageBucket: "story-pulse.appspot.com",
  messagingSenderId: "575942696482",
  appId: "1:575942696482:web:0600f89ae04e48b43ab47b",
};

export const app = initializeApp(firebaseConfig);
