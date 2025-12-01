import express, { Router } from 'express';

const router = Router();

// Enables the use of test-view HTML files for testing different features
router.use('/', express.static('src/test-views'));

export default router;