import { initializeApp } from "firebase/app";
import {
  GithubAuthProvider,
  browserLocalPersistence,
  indexedDBLocalPersistence,
  initializeAuth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_API_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_API_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_API_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_API_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_API_APPID,
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: [indexedDBLocalPersistence, browserLocalPersistence],
});
export const gitHubProvider = new GithubAuthProvider();
