import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  //process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  //process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  //process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  //process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  //process.env.NEXT_PUBLIC_FIREBASE_APP_ID

 
};


const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, app };