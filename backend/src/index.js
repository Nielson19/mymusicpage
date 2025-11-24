import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { connectDB } from '../src/config/db.config.js'

import authRouter from '../src/routes/auth.route.js';
import songRoutes from '../src/routes/song.route.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))

app.use('/api', authRouter);
app.use('/api/song', songRoutes);

// Port, defaults to 3000 (for testing)
const PORT = process.env.PORT || 3000;

// Async function to test MongoDB connection BEFORE starting the server.
const startServer = async () => {
  await connectDB(); // from ./config/db.js
  app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
};

startServer();
