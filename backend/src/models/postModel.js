import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  songAppleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song",
    required: [true, "Song's Apple ID is required"]
  },
  giphyURL: {
    type: String,
    trim: true,
    default: "",
  },
  likeCount: {
    type: Number,
    default: 0,
    min: [0, "Likes cannot be negative"],
  },
  /* FUTURE IMPLEMENTATIONS
  caption: {
    type: String,
    trim: true,
    maxLength: [300, "Caption cannot exceed 300 characters"],
    default: "",
  },
  numOfComments: {
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
  */
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Post", postSchema);
