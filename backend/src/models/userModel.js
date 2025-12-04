// MongoDB _id - ObjectId
// username - String
// email - String
// password - String
// profilePicture - String (TODO: profilePicture or profilePictureUrl)
// bannerPicture - String
// bio - String
// numOfFolloers - Number
// numOfFollowing - Number
// posts - [ObjectId]
// collections - [ObjectId]

// FUTURE IMPLEMENTATIONS:
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
    profile_picture: {
      type: String,
      trim: true,
      default: '',
    },
    banner_picture: {
      type: String,
      trim: true,
      default: '',
    },
    bio: {
      type: String,
      trim: true,
      maxLength: [300, 'Bio cannot exceed 300 characters'],
      default: '',
    },
    number_of_followers: {
      type: Number,
      default: 0,
      min: [0, 'Followers count cannot be negative'],
    },
    number_of_following: {
      type: Number,
      default: 0,
      min: [0, 'Following count cannot be negative'],
    },
    playlists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist',
      },
    ],
    social_links: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    created_at: {
      type: Date,
      default: Date.now,
    },
  }
);


export default mongoose.model('User', userSchema);
