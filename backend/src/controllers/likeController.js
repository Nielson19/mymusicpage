import Like from '../models/likeModel.js';
import Post from '../models/postModel.js';

// Toggle like/unlike for a post
export const toggleLike = async (req, res) => {
  try {
    const { userId, postId } = req.body;

    // Check if the like already exists
    const existingLike = await Like.findOne({ userId, postId });

    if (existingLike) {
      // Unlike: remove the like and decrement count
      await Like.findByIdAndDelete(existingLike._id);
      await Post.findByIdAndUpdate(postId, { $inc: { numOfLikes: -1 } });
      
      res.status(200).json({ message: 'Post unliked', liked: false });
    } else {
      // Like: create new like and increment count
      const newLike = new Like({ userId, postId });
      await newLike.save();
      await Post.findByIdAndUpdate(postId, { $inc: { numOfLikes: 1 } });
      
      res.status(201).json({ message: 'Post liked', liked: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error toggling like', error: error.message });
  }
};

// Check if user liked a post
export const checkLike = async (req, res) => {
  try {
    const { userId, postId } = req.params;
    const existingLike = await Like.findOne({ userId, postId });
    // Return true if liked, false otherwise
    res.status(200).json({ liked: !!existingLike });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error checking like', error: error.message });
  }
};