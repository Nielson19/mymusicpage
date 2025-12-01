import express, { Router } from 'express';
import * as songController from '../controllers/songController.js'

const router = Router();

// GET /api/song/search?term=...
router.get('/search', songController.searchSongs);

export default router;
