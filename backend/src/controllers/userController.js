import User from '../models/userModel.js';
import Post from '../models/postModel.js';
import Like from '../models/likeModel.js';
import Collection from '../models/collectionModel.js';
import Song from '../models/songModel.js';

export const getUserProfile = async (req, res) => {};
  try {
    const targetUserId = req.params.id; // The profile being viewed
    const currentUserId = req.user?.id; // The profile we currently are

    // User Details: Excluding password & __v
    const userPromise = User.findById(targetUserId).select('-password -__v').lean();

    // Column #1: User Posts
    const postsPromise = Post.find({ userId: targetUserId })
      .sort({ createdAt: -1 })
      .limit(10) // Pagination logic can be added later
      .populate('userId', 'username profile_picture') 
      .lean();

  }

export const toggleFollow = async (req, res) => {};

export const searchUsers = async (req, res) => {};