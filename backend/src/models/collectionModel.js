
import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  name: {
    type: String,
    required: [true, "Collection name is required"],
    trim: true,
    minLength: [1, "Collection name must be at least 1 character"],
    maxLength: [100, "Collection name cannot exceed 100 characters"],
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Playlist", playlistSchema);