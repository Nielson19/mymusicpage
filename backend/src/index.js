import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config(); // Load env from project root first, then fall back to src/.env if present.
dotenv.config({ path: './src/.env' });

import testRouter from './routes/testRoute.js';
import authRouter from './routes/authRoute.js';
import postRouter from './routes/postRoute.js';
import songRouter from './routes/songRoute.js';

import { connectDB } from './config/dbConfig.js';

import { ExpressAuth } from '@auth/express'; // Auth.js but for Express (Pre-made security system for handling OAuth)
import Spotify from '@auth/express/providers/spotify';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // For getting a user's session token (stored in a browser cookie).

app.use('/api', authRouter); // For handling non-Spotify logins
app.use('/api/post', postRouter);
app.use('/api/song', songRouter);
//app.use('/api/user', userRoute)

// Handling Spotify logins
app.use('/auth/*', ExpressAuth({
  providers: [Spotify({
    clientId: process.env.AUTH_SPOTIFY_ID, // From Spotify Dev Dashboard
    clientSecret: process.env.AUTH_SPOTIFY_SECRET 
  })],
  callbacks: {
    async redirect() { // After a successful login, send them to the frontend dashboard on port 3002
      return 'http://127.0.0.1:3002/dashboard';
    }
  }
}));

// 'development' v. 'production'
const NODE_ENV = process.env.NODE_ENV;

// Developer-ONLY test routes
// /test/{test-views.html}
if (NODE_ENV === 'development') {
  app.use('/test', testRouter);
  console.log(`\nDevelopment test routes enabled!`);
}

// Port, defaults to 3002 (for testing)
const PORT = process.env.PORT || 3002;

// Async function to test MongoDB connection BEFORE starting the server.
const startServer = async () => {
  await connectDB(); // from ./config/db.js
  app.listen(PORT, () => {
    if (NODE_ENV == 'development') {
      console.log(`\nRunning on LocalHost: http://localhost:${PORT}`);
      console.log(`test-songSearch: http://localhost:${PORT}/test/songSearch.html`);
      console.log(`test-postCreation: http://localhost:${PORT}/test/postCreation.html`);
    }
    else {
      console.log(`\nServer started on port: ${PORT}`);
    }
  });
};

startServer();
