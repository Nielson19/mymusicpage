import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  song_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song",
  },
  caption: {
    type: String,
    trim: true,
    maxLength: [300, "Caption cannot exceed 300 characters"],
    default: "",
  },
  gif_picture: {
    type: String,
    trim: true,
    default: "",
  },
  number_of_likes: {
    type: Number,
    default: 0,
    min: [0, "Likes cannot be negative"],
  },
  number_of_comments: {
    type: Number,
    default: 0,
    min: [0, "Comments cannot be negative"],
  },
  share: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Post", postSchema);
