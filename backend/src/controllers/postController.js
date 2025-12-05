/* TODO: 
* Double check to see if the needed model changes still let this work
*/
import Post from '../models/postModel.js';
import User from '../models/userModel.js';
import Song from '../models/songModel.js';

export const getForYouFeed = async (req, res) => {
  try {
    const currentUserId // Set this up w Brie to make sure that we can double check user ID's

  }
};

export const savePost = async (req, res) => {
  try {
    const { userId, songAppleId, giphyUrl, shape, numOfLikes } = req.body;
    const newPost = new Post({
      userId,
      songAppleId,
      giphyUrl,
      shape,
      numOfLikes
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error creating post', error: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId)
      .populate('user_id', 'username profile_picture')
      .populate('song_id');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};