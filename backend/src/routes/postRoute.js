import express from 'express';

import * as postController from '../controllers/postController.js'

const router = express.Router();

router.post('/', postController.savePost); 
router.get('/:id', postController.getPostById);

export default router;