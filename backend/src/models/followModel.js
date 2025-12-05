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

// There will only ever be one unique combination of follower and following, so it'll be easier to index follows by this (especially when do constant checks against dashboard posts)
// It works like a phonebook too so, it's optimized to find follower, then within follower see who that user is following in an optimized way too
followSchema.index({ follower: 1, following: 1 }, { unique: true });

/* Future Implementation:
followSchema.index({ following: 1 }) // This would allow us to syncNumOfFollowers in the future, but for now we'll just avoid it and, when we do want to index following, we'll adjust that in our DB script.
*/

export default mongoose.model('Follow', followSchema);
