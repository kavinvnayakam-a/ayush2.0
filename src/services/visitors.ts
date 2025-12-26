'use server';

import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '@/firebase/config';

const db = getFirestore(app);

export interface Visitor {
  name: string;
  mobile: string;
  location: string;
  createdAt: Date;
}

export async function addVisitor(visitorData: Omit<Visitor, 'createdAt'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'visitors'), {
      ...visitorData,
      createdAt: new Date(),
    });
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
    throw new Error('Could not save visitor information.');
  }
}
