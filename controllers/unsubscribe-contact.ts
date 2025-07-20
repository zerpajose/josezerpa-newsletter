import config from '../config/environment.js';
import { db } from '../clients/firestore.client.js';

const collectionName = config.contactsCollectionName;
const collection = db.collection(collectionName);

export async function unsubscribeContact(email: string) {
  const document = await collection.where('email', '==', email).get();

  if (document.empty) {
    throw new Error('Contact not found');
  }

  await document.docs[0].ref.update({ unsubscribed: true });
}
