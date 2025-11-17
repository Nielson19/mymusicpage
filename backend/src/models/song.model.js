import mongoose from "mongoose";

/*


*/

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

const musicSchema = new mongoose.Schema({
  track_name: {
    type: String,
    required: [true, "Track name is required"],
    trim: true,
    minLength: [1, "Track name must be at least 1 character"],
    maxLength: [150, "Track name cannot exceed 150 characters"],
  },
  api_info: {
    type: apiInfoSchema,
    required: true,
  },
});

export default mongoose.model("Song", musicSchema);