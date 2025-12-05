import User from '../models/userModel.js';
import Post from '../models/postModel.js';
import Like from '../models/likeModel.js';
import Collection from '../models/collectionModel.js';
import Song from '../models/songModel.js';

export const getUserProfile = async (req, res) => {
  try {
    const targetUserId = req.params.id; // The profile being viewed
    const currentUserId = req.user?.id; // The profile we currently are

    // User Details: Excluding password & __v
    const userPromise = User.findById(targetUserId).select('-password -__v').lean();

    // Column #1: User Posts
    const postsPromise = Post.find({ userId: targetUserId })
      .sort({ createdAt: -1 })
      .limit(10) // We can change this later (just for testing rn)
      .populate('userId', 'username profilePicture') // Even tho we know that this specific user made the post, we'll still populate it so that it's consistent with every other Post creation thingy later. Gets username + pro
      .lean(); // Heavy object becomes a JSON

    // Column #2: Liked Posts
    const likesPromise = Like.find({ userId: targetUserId, resourceType: 'Post' }
      .sort({ createdAt: -1 }))
      .limit(10)
      .populate({ // Showing the resource being liked + who likin it and their username + pfp
        path: 'resourceId',
        model: 'Post',
        populate: { // Nested populating
          path: 'userId',
          select: 'username profilePicture'
        } 
      })
      .lean();

    // Column #3-5: User Coollections (3, Top 3 in future(?))
    const collectionsPromise = Collection.find({ userId: targetUserId }
      .sort({ updatedAt: -1 }))
      .limit(3)
      .populate({ // Showing the resource being liked + who likin it and their username + pfp
        path: 'posts.postId',
        model: 'Post',
        populate: { 
          path: 'userId', 
          select: 'username profilePicture' 
        }
      })
      .lean();
    // Order of action: Find the collection -> You see list of PostIds -> Take those PostIds and go to the post collection -> Once it's inside those posts, see the userId field -> Take this userId to the user collection.

    // Logic to execute them ALL in parallel (not one by one)

    // Clean likedPosts after getting data so we can filter out deleted posts. (returns resourceId as null)

    // Clean collection posts after getting data to filter out deleted posts.

    // NOTE: FOR BOTH CLEANS, DELETE THE DOC SO WE DON'T HAVE THE PROB AGAIN.

    //if (!u) return res.status(404).json({ nessage: "User not found." })
  }
  catch { }
};

//export const toggleFollow = async (req, res) => {};

//export const searchUsers = async (req, res) => {};