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
            adminApp = initializeApp();
        } else {
            // Only log, don't throw. In some environments, we might not have server-side auth
            // but the app should not crash. Client-side operations will still work.
            console.warn('Firebase Admin initialization failed. Server-side admin operations will not work. Set FIREBASE_SERVICE_ACCOUNT_KEY for local dev or deploy to a Google Cloud environment.');
        }
    } catch (error: any) {
        console.error("Firebase Admin SDK Initialization Error:", error.message);
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
  if (!adminApp) {
    throw new Error("Server is not configured for database operations. Please contact support.");
  }
  
  const visitorsRef = db.collection('visitor_passes');

  try {
    const docRef = await visitorsRef.add({
      ...visitorData,
      registrationDate: Timestamp.now(),
    });
    console.log('Visitor pass created with ID: ', docRef.id);
    return docRef.id;
  } catch (e: any) {
    console.error('Error adding document to Firestore: ', e);
    // Provide a more generic error to the user but log the specific one.
    throw new Error('Could not save visitor information due to a server error.');
  }
}
