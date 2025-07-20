import { Resend } from 'resend';
import config from '../config/environment.js';
import { getSecret } from '../helpers/secret-manager.js'
import { CreateContactInput } from '../types/common.types.js';
import { db } from '../clients/firestore.client.js';

const collectionName = config.contactsCollectionName;
const collection = db.collection(collectionName);

export async function createContact(contact: CreateContactInput) {
  const resendApikey = await getSecret(config.googleProjectId, config.resendSecretId);
  const resend = new Resend(resendApikey);

  const { name, familyName, email, unsubscribed = false } = contact;

  resend.contacts.create({
    email,
    firstName: name,
    lastName: familyName,
    unsubscribed,
    audienceId: config.resendAudienceId,
  });
}
