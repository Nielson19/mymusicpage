// MongoDB _id - ObjectId
// userId - ObjectId
// songAppleId - ObjectId
// giphyUrl - String
// shape - String
// numOfLikes - Number

// timestamps:
// createdAt - date
// updatedAt - date

// FUTURE IMPLEMENTATIONS:
// caption - String
// comments - [ObjectId]
// numOfComments - Number

import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    songAppleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song',
      required: [true, 'Songs Apple ID is required']
    },
    giphyUrl: {
      type: String,
      trim: true,
      default: ''
    },
    shape: {
      type: String,
      enum: ['Portrait', 'Square'],
      default: 'Portrait'
    },
    numOfLikes: {
      type: Number,
      default: 0,
      min: [0, 'Likes cannot be negative']
    }
  },    
  {
    timestamps: true
  }
);

export default mongoose.model('Post', postSchema);
