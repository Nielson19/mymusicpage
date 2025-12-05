import mongoose from 'mongoose';

export const connectDB = async () => {
  console.log(`Connecting to the Database...`);
  try {
    const mongoUri = process.env.MONGO_DB;

    if (!mongoUri || typeof mongoUri !== 'string') {
      throw new Error('MONGO_DB env var missing or not a string');
    }

    const conn = await mongoose.connect(mongoUri);

    console.log(`\n✅ MongoDB Connected!`);
    console.log(`-----------------------------------`);
    console.log(` Database Name:   '${conn.connection.name}'`);
    console.log(` Host / Cluster:  ${conn.connection.host}`);
    console.log(`-----------------------------------`);
  }
  // MongoDB will give an error if it takes longer than 30 seconds. If it crashes though, Netlify will ensure the server restarts and tries again.
  catch (error) {
    console.error(`Failed to connect to MongoDB! Error: ${error.message}`);
    process.exit(1);
  }
};