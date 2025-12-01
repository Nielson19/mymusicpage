import express from 'express';
import User from '../models/userModel.js';

const router = express.Router();

router.get('/profile', async (req, res) => {
  try {
    // mock user ID to test - replace this with your auth middleware
    const userId = req.headers.userid || '507f1f77bcf86cd799439011'; // Mock user ID
    
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({
      username: user.username,
      email: user.email,
      bio: user.bio,
      profile_picture: user.profile_picture,
      banner_picture: user.banner_picture,
      social_links: user.social_links
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

router.put('/profile', async (req, res) => {
  try {
    // mock user ID to test - replace this with your auth middleware
    const userId = req.headers.userid || '507f1f77bcf86cd799439011'; // Mock user ID
    
    const { 
      username, 
      email, 
      bio, 
      profile_picture, 
      banner_picture, 
      social_links 
    } = req.body;
    
    
    const updateData = {};
    if (username !== undefined) updateData.username = username;
    if (email !== undefined) updateData.email = email;
    if (bio !== undefined) updateData.bio = bio;
    if (profile_picture !== undefined) updateData.profile_picture = profile_picture;
    if (banner_picture !== undefined) updateData.banner_picture = banner_picture;
    if (social_links !== undefined) updateData.social_links = social_links;
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { 
        new: true, 
        runValidators: true 
      }
    ).select('-password');
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        username: updatedUser.username,
        email: updatedUser.email,
        bio: updatedUser.bio,
        profile_picture: updatedUser.profile_picture,
        banner_picture: updatedUser.banner_picture,
        social_links: updatedUser.social_links
      }
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    if (error.code === 11000) {
      // Duplicate error (username or email already exists)
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ 
        message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists` 
      });
    }
    res.status(400).json({ message: 'Error updating profile', error: error.message });
  }
});

export default router;