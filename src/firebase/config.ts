// To find your Firebase config object, go to
// https://console.firebase.google.com/project/ayushconclave--arogya-expo/settings/general/
// and scroll down to the "Your apps" section.

import { initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {
  apiKey: "TODO: Your API key",
  authDomain: "TODO: Your auth domain",
  projectId: "ayushconclave--arogya-expo",
  storageBucket: "TODO: Your storage bucket",
  messagingSenderId: "TODO: Your messaging sender ID",
  appId: "TODO: Your app ID"
};

// Initialize Firebase
function initializeFirebase() {
  if (!getApps().length) {
    return initializeApp(firebaseConfig);
  }
}

export const app = initializeFirebase();
