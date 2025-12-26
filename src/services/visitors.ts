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
  number: string; // Changed from 'mobile' to match form
  mailId: string;
  location: string;
  registrationDate: any;
}

export async function addVisitor(
  visitorData: Omit<Visitor, 'registrationDate'>
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'visitor_passes'), {
      name: visitorData.name,
      number: visitorData.number, // Ensure field name matches
      mailId: visitorData.mailId,
      location: visitorData.location,
      registrationDate: Timestamp.now(),
    });
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
    throw new Error('Could not save visitor information.');
  }
}
