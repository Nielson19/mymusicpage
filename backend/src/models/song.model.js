import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  apple_id: {
    type: String,
    required: [true, "An Apple ID is required"],
    trim: true,
    unique: true // Unique creates an index as well, good for fast searching and upserting.
  },
  name: {
    type: String,
    required: [true, "A song name is required"],
    trim: true,
    minLength: [1, "Song name must be at least 1 character"],
    maxLength: [500, "Song name cannot exceed 500 characters"]
  },
  artist_name: {
    type: String,
    required: [true, "An artist is required"],
    trim: true,
    minLength: [1, "Artist name must be at least 1 character"],
    maxLength: [500, "Artist name cannot exceed 500 characters"]
  },
  album_name: String,
  artwork_url: String,
  preview_url: String,
  release_date: Date,
  is_streamable: {type: Boolean, required: true}
});

// MongoDB will get the song_name and artist_name and chop them up word by word. Then it'll put them in a big glossary that allows for fast searching "Swift Story" will bring out Taylor Swift's Love Story very quickly.
songSchema.index(
  { name: 'text', artist_name: 'text' }, 
  { weights: { name: 2, artist_name: 1 }} // Names are worth double points when matching search terms (prioritizing song names first)
);

export default mongoose.model("Song", songSchema);