import mongoose from "mongoose";

const apiInfoSchema = new mongoose.Schema(
  {
    spotify_id: {
      type: String,
      required: [true, "Spotify ID is required"],
      trim: true,
      unique: true,
    },
    duration: {
      type: Number,
      min: [0, "Duration cannot be negative"],
    },
    artist: {
      type: String,
      trim: true,
      minLength: [1, "Artist name must be at least 1 character"],
      maxLength: [100, "Artist name cannot exceed 100 characters"],
    },
  },
  { _id: false }
);

const songSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Song name is required"],
    trim: true,
    minLength: [1, "Song name must be at least 1 character"],
    maxLength: [150, "Song name cannot exceed 150 characters"],
  },
  api_info: {
    type: apiInfoSchema,
    required: true,
  },
});

export default mongoose.model("Song", songSchema);