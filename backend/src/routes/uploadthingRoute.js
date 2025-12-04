import express from 'express';
import { createRouteHandler } from 'uploadthing/express';
import { ourFileRouter } from '../config/uploadthingConfig.js';

const router = express.Router();

//route handler
const uploadthingHandler = createRouteHandler({
  router: ourFileRouter,
  config: {
    token: process.env.UPLOADTHING_TOKEN,
  },
});

router.use('/uploadthing', uploadthingHandler);

export default router;