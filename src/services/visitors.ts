'use server';

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

// IMPORTANT: Do not expose this service account key to the client-side.
// This is a server-only file.

try {
  if (getApps().length === 0) {
    const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (serviceAccountString) {
      const serviceAccount = JSON.parse(serviceAccountString);
      initializeApp({
        credential: cert(serviceAccount),
      });
    } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
       // This will work in environments where the GOOGLE_APPLICATION_CREDENTIALS path is set
       initializeApp();
    } else {
      // Check for App Hosting environment variables
      if (process.env.GCLOUD_PROJECT) {
          initializeApp();
      } else {
          throw new Error('Firebase Admin initialization failed. FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set and not in a recognized Google Cloud environment.');
      }
    }
  }
} catch (error: any) {
  console.error("Firebase Admin SDK Initialization Error:", error.message);
  // We throw a new error to avoid leaking implementation details to the client.
  throw new Error("A server configuration error occurred. Please check the server logs.");
}


const db = getFirestore();

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

  // Check for existing number
  const numberQuery = await visitorsRef.where('number', '==', visitorData.number).limit(1).get();
  if (!numberQuery.empty) {
    throw new Error('This phone number is already registered.');
  }

  // Check for existing email
  const mailIdQuery = await visitorsRef.where('mailId', '==', visitorData.mailId).limit(1).get();
  if (!mailIdQuery.empty) {
    throw new Error('This email address is already registered.');
  }

  try {
    const docRef = await visitorsRef.add({
      ...visitorData,
      registrationDate: Timestamp.now(),
    });
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (e: any) {
    console.error('Error adding document: ', e);
    // Re-throw a generic error if something else goes wrong during the write.
    throw new Error('Could not save visitor information. Please try again.');
  }
}
