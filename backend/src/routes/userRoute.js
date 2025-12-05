import userController from '../controllers/userController.js';
import { Router } from 'express';

const router = Router();

router.get('/:id', userController.getUserProfile);
router.post('/follow', userController.toggleFollow);

export default router;
