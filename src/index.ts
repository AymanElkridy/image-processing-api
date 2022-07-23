// IMPORTING DEPENDENCIES

import express from 'express';
import resizeImage from './middleware/resizeImage';

// CREATING APP INSTANCE

const app: express.Application = express();

// GLOBAL CONSTANTS

const imageEndPoint = '/image';
const port = 3002;
const listener = (): void => {
  console.log(`server running on port: ${port}`);
};

// IMAGE RESIZING GET REQUEST

app.get(imageEndPoint, resizeImage);

// START THE SERVER

app.listen(port, listener);

// EXPORTS

export { app };
