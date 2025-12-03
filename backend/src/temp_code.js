import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import testRouter from './routes/testRoute.js';
import authRouter from './routes/authRoute.js';
import postRoutes from './routes/postRoute.js';
import songRouter from './routes/songRoute.js';

import { connectDB } from './config/dbConfig.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // wah eh

app.use('/api', authRouter);
app.use('/api/post', postRoutes);
app.use('/api/song', songRouter);

// development v. production
const NODE_ENV = process.env.NODE_ENV;

// Developer-ONLY test routes
// /test/{test-views.html}
if (NODE_ENV === 'development') {
  app.use('/test', testRouter);
  console.log(`\nDevelopment test routes enabled!`);
}

// Port, defaults to 3000 (for testing)
const PORT = process.env.PORT || 3000;

// Async function to test MongoDB connection BEFORE starting the server.
const startServer = async () => {
  await connectDB(); // from ./config/db.js
  app.listen(PORT, () => {
    if (NODE_ENV == 'development') {
      console.log(`\nRunning on LocalHost: http://localhost:${PORT}`);
      console.log(`test-songSearch: http://localhost:${PORT}/test/songSearch.html`);
    }
    else {
      console.log(`\nServer started on port: ${PORT}`);
    }
  });
};

startServer();
