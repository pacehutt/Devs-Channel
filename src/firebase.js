import { initializeApp } from "@firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage, ref } from "@firebase/storage";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtkCf1uLgn-5u9xIPWfjD52BsOn5IAlS4",
  authDomain: "dev-channel-75022.firebaseapp.com",
  projectId: "dev-channel-75022",
  storageBucket: "dev-channel-75022.appspot.com",
  messagingSenderId: "49360565369",
  appId: "1:49360565369:web:876f84d349763a2d5090a8",
  measurementId: "G-9NVWNC7VD0",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

// Create a root reference

export const storage = getStorage();
export const db = getFirestore();
