'use server';

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

// IMPORTANT: Do not expose this service account key to the client-side.
// This is a server-only file.
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : undefined;

if (getApps().length === 0) {
  if (serviceAccount) {
    initializeApp({
      credential: cert(serviceAccount),
    });
  } else {
    // This will work in Firebase App Hosting environments
    initializeApp();
  }
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
