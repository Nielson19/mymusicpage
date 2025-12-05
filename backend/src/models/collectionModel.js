// MongoDB _id - ObjectId
// userId - ObjectId
// name - String
// posts - [savedPostSchema] (Basically, postId + addedAt)

// savedPostSchema:
// postId - ObjectId
// addedAt - Date

import mongoose from 'mongoose';

const savedPostSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }, { _id: false });

const collectionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    name: {
      type: String,
      required: [true, 'A collection name is required'],
      trim: true,
      minLength: [1, 'Collection name must be at least 1 character'],
      maxLength: [100, 'Collection name cannot exceed 100 characters'],
    },
    posts: [savedPostSchema]
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Collection', collectionSchema);