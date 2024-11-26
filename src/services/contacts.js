import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = () => ContactsCollection.find();

export const getContactById = (contactId) =>
  ContactsCollection.findById(contactId);

export const createContact = (payload) => ContactsCollection.create(payload);

export const deleteContact = (filter) =>
  ContactsCollection.findOneAndDelete(filter);

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
  };
};
