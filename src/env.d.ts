/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_FIREBASE_API_KEY: string;
  VITE_FIREBASE_API_AUTHDOMAIN: string;
  VITE_FIREBASE_API_PROJECTID: string;
  VITE_FIREBASE_API_STORAGEBUCKET: string;
  VITE_FIREBASE_API_MESSAGINGSENDERID: string;
  VITE_FIREBASE_API_APPID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
