import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbEc4947mIgoZuVxT075jZY7t4hFCeGlw",
  //process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "leetcode-97f9f.firebaseapp.com",
  //process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: 
  "leetcode-97f9f",  //process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: "19556851571",
  //process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: '"1:19556851571:web:495858c2fb7d524b91ef06"'
  //process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};


const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, app };