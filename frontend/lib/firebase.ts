import { initializeApp, getApps, getApp } from "firebase/app";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  browserLocalPersistence,
  browserPopupRedirectResolver,
  getAuth,
  indexedDBLocalPersistence,
  initializeAuth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || process.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const requiredConfigKeys = [
  "apiKey",
  "authDomain",
  "projectId",
  "appId",
  "messagingSenderId",
] as const;

const missingConfigKeys = requiredConfigKeys.filter((key) => !firebaseConfig[key]);

if (missingConfigKeys.length > 0) {
  throw new Error(
    `Missing Firebase config: ${missingConfigKeys.join(", ")}. Check frontend/.env.local NEXT_PUBLIC_FIREBASE_* values.`,
  );
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = (() => {
  if (typeof window === "undefined") {
    return getAuth(app);
  }

  try {
    return initializeAuth(app, {
      persistence: [indexedDBLocalPersistence, browserLocalPersistence],
      popupRedirectResolver: browserPopupRedirectResolver,
    });
  } catch {
    return getAuth(app);
  }
})();

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Standard custom parameters to prompt user for account selection
googleProvider.setCustomParameters({ prompt: "select_account" });

export { app, auth, googleProvider, githubProvider };
