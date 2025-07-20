import { randomUUID } from 'crypto';
import config from '../config/environment.js';
import { CreateContactInput } from '../types/common.types.js';
import { db } from '../clients/firestore.client.js';

const collectionName = config.contactsCollectionName;
const collection = db.collection(collectionName);

export async function createContact(contact: CreateContactInput) {
  const { name, familyName, email, unsubscribed = false } = contact;
  const document = await collection.where('email', '==', email).get();

  if (!document.empty) {
    throw new Error('Email already exists, you can only update it');
  }

  const id = randomUUID();

  const docRef = collection.doc(id);

  await docRef.set({
    id,
    name,
    familyName,
    email,
    unsubscribed,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}
