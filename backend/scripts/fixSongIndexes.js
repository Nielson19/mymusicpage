// Script to fix song collection indexes
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test';

async function fixIndexes() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    const collection = db.collection('songs');

    // Get all indexes
    const indexes = await collection.indexes();
    console.log('\nCurrent indexes:');
    indexes.forEach(idx => console.log(`  - ${idx.name}`));

    // Drop the problematic index if it exists
    try {
      await collection.dropIndex('api_info.spotify_id_1');
      console.log('\n✓ Dropped old api_info.spotify_id_1 index');
    } catch (err) {
      if (err.codeName === 'IndexNotFound') {
        console.log('\n✓ Index api_info.spotify_id_1 does not exist');
      } else {
        throw err;
      }
    }

    // Show final indexes
    const finalIndexes = await collection.indexes();
    console.log('\nFinal indexes:');
    finalIndexes.forEach(idx => console.log(`  - ${idx.name}`));

    console.log('\n✓ Index fix complete!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDisconnected from MongoDB');
  }
}

fixIndexes();
