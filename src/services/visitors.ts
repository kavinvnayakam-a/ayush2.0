'use server';

import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

let adminApp: App;

// Unified initialization logic
if (!getApps().length) {
  try {
    const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    
    if (serviceAccountString) {
      const serviceAccount = JSON.parse(serviceAccountString);
      adminApp = initializeApp({ credential: cert(serviceAccount) });
    } else if (process.env.GCLOUD_PROJECT) {
      // For Google Cloud environments like App Hosting, Cloud Run, etc.
      adminApp = initializeApp();
    } else {
      throw new Error('Firebase Admin initialization failed. Set FIREBASE_SERVICE_ACCOUNT_KEY for local dev or deploy to a Google Cloud environment.');
    }
  } catch (error: any) {
    console.error("Firebase Admin SDK Initialization Error:", error.message);
    // This error will now be more informative for debugging.
    throw new Error("A server configuration error occurred. Please check server logs for details on Firebase Admin initialization.");
  }
} else {
  adminApp = getApps()[0];
}

const db = getFirestore(adminApp);

export interface Visitor {
  name: string;
  number: string;
  mailId: string;
  location: string;
}

export async function addVisitor(
  visitorData: Visitor
): Promise<string> {
  const visitorsRef = db.collection('visitor_passes');

  try {
    const docRef = await visitorsRef.add({
      ...visitorData,
      registrationDate: Timestamp.now(),
    });
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (e: any) {
    console.error('Error adding document to Firestore: ', e);
    // This will now throw the specific Firestore error for better debugging if the issue is not initialization.
    throw new Error(e.message || 'Could not save visitor information. Please try again.');
  }
}
