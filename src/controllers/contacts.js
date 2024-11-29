import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const { _id: userId } = req.user;
  filter.userId = userId;

  const data = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const data = await getContactById(contactId, userId);

  if (!data) {
    throw createHttpError(
      404,
      'Contact not found or does not belong to the logged-in user',
    );
  }

  res.json({
    status: 200,
    message: `Successfully found contact with this id : ${contactId}`,
    data,
  });
};

export const createContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const data = await createContact({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully create contact',
    data,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId: _id } = req.params;
  const { _id: userId } = req.user;
  const contact = await deleteContact({ _id, userId });

  if (!contact) {
    next(
      createHttpError(
        404,
        'Contact not found or does not belong to the logged-in user',
      ),
    );
    return;
  }
  res.status(204).send();
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const result = await updateContact(contactId, userId, req.body, {
    upsert: true,
  });

  if (!result) {
    next(
      createHttpError(
        404,
        'Contact not found or does not belong to the logged-in user',
      ),
    );
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully upserted a contact',
    data: result.contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const result = await updateContact(contactId, userId, req.body);
  if (!result) {
    next(
      createHttpError(
        404,
        'Contact not found or does not belong to the logged-in user',
      ),
    );
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact !',
    data: result.contact,
  });
};
