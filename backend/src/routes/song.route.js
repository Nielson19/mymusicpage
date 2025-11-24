import { Router } from 'express';
// import { } from '../src/controllers/song.controller.js

const router = Router();

// /api/song/dev/get, cause app.use adds api/song
router.get('/dev/get', async (req, res) => {
    try {
        // Fetching iTunes Search API Data
        const apiResponse = await fetch("https://itunes.apple.com/search?term=kanye+west+in+paris&entity=song&limit=1");

        // Turn that data into a JSON
        const data = await apiResponse.json();

        // Send the JSON back
        res.json(data);

    } catch (error) {
        console.error("Error fetching song:", error);
        res.status(500).json({ error: "Failed to fetch song data" });
    }
});

export default router;
