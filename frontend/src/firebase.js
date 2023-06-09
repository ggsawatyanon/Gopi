import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const config = {
  apiKey: "AIzaSyB7GtNcTwNgfC7ykSGvzQdMSpkAqZRb3aE",
  authDomain: "gopi-cu.firebaseapp.com",
  projectId: "gopi-cu",
  storageBucket: "gopi-cu.appspot.com",
  messagingSenderId: "527293978389",
  appId: "1:527293978389:web:a46a0c5ccda68e1856fb1c",
  measurementId: "G-T10KEE6BRK"
};

const app = initializeApp(config)
export const db = getFirestore(app)