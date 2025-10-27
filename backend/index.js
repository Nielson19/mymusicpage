const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000 // We can change this in the future for Netlify's stuff

const dbURL = process.env.MONGODB_URL;

// Connection attempt
mongoose.connect(dbURL)
  //If it succeeds
  .then(() => {
    console.log('Successfully connected to MongoDB');
    // Boot up the server
    app.listen(PORT, () => {
      console.log('Server is running on port 3000');
    });
  })
  //If it fails, give an error log
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });