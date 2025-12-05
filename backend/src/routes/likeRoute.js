import express from 'express';
import { toggleLike, checkLike } from '../controllers/likeController.js';

const router = express.Router();
// Toggle like/unlike for a post
router.post('/', toggleLike);
// Check if user liked a post
router.get('/:userId/:postId', checkLike);


export default router;