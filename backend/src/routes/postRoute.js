import express from 'express';
import Post from '../models/postModel.js'; 
import User from '../models/userModel.js';  
import Song from '../models/songModel.js';  

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { user_id, songAppleId, gif_picture_url, shape, shareable_links} = req.body;
    const newPost = new Post({
      user_id,
      song_id,
      caption,
      gif_picture,
      share
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error creating post', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
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
});

export default router;