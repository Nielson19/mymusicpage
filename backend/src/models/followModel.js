// follower - ObjectId (userId)
// following - ObjectId (userId)
// createdAt - Date

import mongoose from 'mongoose';

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Follower User ID is required.'],
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Following User ID is required.'],
    }
  },
  {
    timestamps: { createdAt: true } // Only creates createdAt, not updatedAt
  }
);