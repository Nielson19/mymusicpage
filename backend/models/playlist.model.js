import mongoose from "mongoose";


//TODO: Add image link for the playlist
//TODO: Description for the playlist

const playlistSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  name: {
    type: String,
    required: [true, "Playlist name is required"],
    trim: true,
    minLength: [1, "Playlist name must be at least 1 character"],
    maxLength: [100, "Playlist name cannot exceed 100 characters"],
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Playlist", playlistSchema);