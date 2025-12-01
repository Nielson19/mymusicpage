import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import testRoutes from './routes/test.route.js';
import authRoutes from './routes/auth.route.js';
import songRoutes from './routes/song.route.js';

import { connectDB } from './config/db.config.js'
import { fetchItunesSearch } from './services/itunes.service.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))

app.use('/api', authRoutes);
app.use('/api/song', songRoutes);

// development v. production
const NODE_ENV = process.env.NODE_ENV;

// Developer-ONLY test routes
// /test/{test-views.html}
if (NODE_ENV === 'development') {
    app.use('/test', testRoutes);
    console.log(`\nDevelopment test routes enabled!`);
}

// Port, defaults to 3000 (for testing)
const PORT = process.env.PORT || 3000;

// Async function to test MongoDB connection BEFORE starting the server.
const startServer = async () => {
  await connectDB(); // from ./config/db.js
  app.listen(PORT, () => {
    if (NODE_ENV == 'development'){
      console.log(`\nRunning on LocalHost: http://localhost:${PORT}`)
    }
    else{
      console.log(`\nServer started on port ${PORT}`);
    }
    console.log(`\n-----------------------------------`);
  });
};

startServer();
