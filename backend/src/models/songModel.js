// MongoDB _id  - ObjectId (Only for debugging purposes)
// appleId - String
// name - String
// artistName - String
// albumName - String
// artworkUrl - String
// previewUrl - String
// releaseDate - Date
// isStreamable - Boolean

// timestamps:
// createdAt - Date
// updatedAt - Date

import mongoose from 'mongoose';

const songSchema = new mongoose.Schema(
  {
    appleId: {
      type: String,
      required: [true, 'An Apple ID is required'],
      trim: true,
      unique: true // Unique creates an index as well, good for fast searching and upserting.
    },
    name: {
      type: String,
      required: [true, 'A song name is required'],
      trim: true,
      minLength: [1, 'Song name must be at least 1 character'],
      maxLength: [500, 'Song name cannot exceed 500 characters']
    },
    artistName: {
      type: String,
      required: [true, 'An artist is required'],
      trim: true,
      minLength: [1, 'Artist name must be at least 1 character'],
      maxLength: [500, 'Artist name cannot exceed 500 characters']
    },
    albumName: String,
    artworkUrl: String,
    previewUrl: String,
    releaseDate: Date,
    isStreamable: {type: Boolean, required: true}
  },
  { // Saves a version int to show what version this doc is on (useless unless multiple ppl work on the same thing)
      versionKey: false 
  },
  {
    timestamps: true
  }
);

// MongoDB will get the song_name and artistName and chop them up word by word. Then it'll put them in a big glossary that allows for fast searching 'Swift Story' will bring out Taylor Swift's Love Story very quickly.
songSchema.index(
  { name: 'text', artistName: 'text' }, 
  { weights: { name: 1.5, artistName: 1 }} // Names are worth extra points when matching search terms (prioritizing song names first)
);

export default mongoose.model('Song', songSchema);