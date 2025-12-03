// userID - ObjectId
// resourceId - ObjectId
// resourceType - String
// createdAt - Date

import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required."],
    },
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "resourceType",
      required: [true, "A resource ID is required."],
    },
    resourceType: {
      type: String,
      required: [true, "A resource type is required."],
      enum: ["Post"], // Can add other values in the future (comments, collections, etc.)
      default: "Post" // for simplicity right now.
    },
  },
  {
    timestamps: { createdAt: true } // Only creates createdAt, not updatedAt
  }
);

// Works differently than simply, unique: true, this is saying that the combination of these two ID's is a unique combination, and this document can be discovered using that unique combination.
likeSchema.index({ userId: 1, resourceId: 1, resoureceType: 1 }, { unique: true });