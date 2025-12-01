import express, { Router } from 'express';
import * as SongController from '../controllers/song.controller.js'

const router = Router();

// GET /api/song/search?term=...
router.get('/search', SongController.searchSongs);

export default router;
