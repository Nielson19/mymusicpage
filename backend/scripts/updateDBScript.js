import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Song } from '../src/models/song.model.js';
import { connectDB } from '../src/config/dbConfig.js'

dotenv.config();

// Boolean switch to not accidentally blow up the DB if you're trying complicated logic.
// (if it's just updateMany, we can just use it for the filter)
const TEST_RUN = true;

const runChanges = async () => {
  try {
    await connectDB();
    console.log(`Starting Changes`);
    
    // ADJUSTABLE LOGIC SECTION
    
    // BASIC EXAMPLE FOR UPDATING DB FIELDS:
    // updateMany takes in two arguments (filter, update)

    // const filter = { yomommafield: { $exists: false } };
    // const update = { $set: { yomommafield: 'default value' } }

    // if (TEST_RUN) {
    //  console.log('TEST_RUN is enabled')
    //  const count = await Song.countDocuments(filter);
    //  console.log(`Found ${count} documents matching the filter);
    // } 
    // else {
    //  const result = await Song.updateMany(filter, update);
    //  console.log(`Matched ${result.matchedCount} docs | Modified: ${result.modifiedCount} docs`)  
    // }
    
    // ADJUSTABLE LOGIC END

  } 
  catch (error) {
    console.error('Changes Failed:', error);
  } 
  finally {
    await mongoose.disconnect();
    console.log('Connection closed. Script finished.');
    process.exit();
  }
};

runChanges();