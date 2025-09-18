// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Replace with your own Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyB7ahi6A1nlwDDFCTxJIPcUchZgqWq8I8Q",
  authDomain: "auth-36d2e.firebaseapp.com",
  projectId: "auth-36d2e",
  storageBucket: "auth-36d2e.firebasestorage.app",
  messagingSenderId: "480758954477",
  appId: "1:480758954477:web:490f2d7618837a7af2cfe4",
  measurementId: "G-7ZDNVWZLWN"
};

// Initialize Firebase only once
const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
