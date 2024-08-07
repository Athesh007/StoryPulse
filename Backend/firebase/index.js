import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "dotenv/config";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "story-pulse.firebaseapp.com",
  projectId: "story-pulse",
  storageBucket: "story-pulse.appspot.com",
  messagingSenderId: "575942696482",
  appId: "1:575942696482:web:0600f89ae04e48b43ab47b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
