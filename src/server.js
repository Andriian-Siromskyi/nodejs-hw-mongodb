import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

export const startServer = () => {
  const app = express();
  app.use(cors());
  // app.use(express.json());

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });
  //   app.use(logger);

  app.get('/', (req, res) => {
    res.json({
      message: 'Start project',
    });
  });

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({
        message: `Contact with id=${contactId} not found`,
      });
      return;
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      message: `${req.url} not found`,
    });
  });

  app.use((error, req, res, next) => {
    res.status(500).json({
      message: error.message,
    });
  });

  const port = Number(env('PORT', '3000'));

  app.listen(port, () => console.log(`Server is running on port ${port}`));
};
