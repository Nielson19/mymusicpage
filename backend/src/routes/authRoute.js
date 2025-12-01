// Placeholder file atm
// Note for later (Chris): Suggest changing the name to auth.route.js

import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.send('User route with GET method');
});

export default router