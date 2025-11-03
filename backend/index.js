require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;


app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

//import
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const songRoutes = require('./routes/songRoutes');

//MongoDB 
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error connecting to MongoDB:', err.message);
    process.exit(1);
  });

//routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/songs', songRoutes); 


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API. It is running!' });
});