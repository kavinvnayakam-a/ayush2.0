// To find your Firebase config object, go to
// https://console.firebase.google.com/project/ayushconclave--arogya-expo/settings/general/
// and scroll down to the "Your apps" section.

import { initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: "ayushconclave--arogya-expo",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
function initializeFirebase() {
  if (!getApps().length) {
    return initializeApp(firebaseConfig);
  }
}

export const app = initializeFirebase();
