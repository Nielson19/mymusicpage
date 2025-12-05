// MongoDB _id - ObjectId
// username - String
// email - String
// password - String
// profilePicture - String (profilePicture or profilePictureUrl?)
// bannerPicture - String
// numOfFollowers - Number
// numOfFollowing - Number
// posts - [ObjectId]
// collections - [ObjectId]

// timestamps:
// createdAt - Date
// updatedAt - Date

// FUTURE IMPLEMENTATIONS:
// bio - String
// socialLinks - [String]

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      unique: true,
      minLength: [3, 'Username must be at least 3 characters long'],
      maxLength: [30, 'Username cannot exceed 30 characters'],
    },
    email: {
      type: String,
      required: [true, 'User Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+.\S+/, 'Invalid email address'],
    },
    password: {
      type: String,
      // Not required for Spotify login users.
    },
    profilePicture: {
      type: String,
      trim: true,
      default: '',
    },
    bannerPicture: {
      type: String,
      trim: true,
      default: '',
    },
    numOfFollowers: {
      type: Number,
      default: 0,
      min: [0, 'Follower count cannot be negative'],
    },
    numOfFollowing: {
      type: Number,
      default: 0,
      min: [0, 'Following count cannot be negative'],
    },
    posts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Post',
      default: []
    },
    collections: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Collection',
      default: []
    }
  }
);


export default mongoose.model('User', userSchema);

/*
    bio: {
      type: String,
      trim: true,
      maxLength: [300, 'Bio cannot exceed 300 characters'],
      default: '',
    },
    socialLinks: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
*/
