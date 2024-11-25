import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactByID = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};