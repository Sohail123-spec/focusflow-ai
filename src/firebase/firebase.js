import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAcB_ezzx9rn6FM8WMW2d-jNXZ7w7LIUE0",
  authDomain: "focusflow-ai-44462.firebaseapp.com",
  projectId: "focusflow-ai-44462",
  storageBucket: "focusflow-ai-44462.firebasestorage.app",
  messagingSenderId: "62789991366",
  appId: "1:62789991366:web:caf962e8634c85ffd0d0c7",
  measurementId: "G-Q2WVTDGJL2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export default app;