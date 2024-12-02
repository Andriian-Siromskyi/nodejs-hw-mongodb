import { initMongoDB } from './db/initMongoDB.js';
import { startServer } from './server.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constans/index.js';
import { createDirIfNotExists } from './/utils/createDirIfNotExists.js';

const bootstrap = async () => {
  await initMongoDB();
  await createDirIfNotExists(UPLOAD_DIR);
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  startServer();
};

void bootstrap();
