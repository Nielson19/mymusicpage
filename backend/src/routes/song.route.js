import { Router } from 'express';
import { fetchItunesSearch } from '../services/itunes.service.js';
import Song from '../models/song.model.js';

const router = Router();

// GET /api/song/search?term=...
// req: Request, user input. res: Response, the data we'll send back
router.get('/search', async (req, res) => {
    const { term } = req.query;
    // Should return something like this: { term: "Adele" }

    // Browser way of handling errors
    // 400 Bad Request - Server cannot process request (syntax error)
    if (!term) return res.status(400).json({ error: "Missing term" });

    try {
        // Fetch 50 songs, wait for this function to finish first though before moving on.
        const apiSongs = await fetchItunesSearch(term, 50);

        const formattedSongs = apiSongs.map(song => ({
            apple_id: String(song.trackId),
            name: song.trackName,
            artist_name: song.artistName,
            album_name: song.collectionName,
            artwork_url: song.artworkUrl100 
                ? song.artworkUrl100.replace('100x100', '256x256') 
                : null, // Increases artwork size to 256x256. If the artwork never existed though, just return null.
            preview_url: song.previewUrl,
            release_date: song.releaseDate,
            is_streamable: Boolean(song.isStreamable && song.previewUrl && song.previewUrl.trim().length > 0)
        }));

        // Upserting / Bulk Writing
        if (formattedSongs.length > 0) {
            // Turns the list of songs into a list of instructions.
            const operations = formattedSongs.map(song => ({
                updateOne: {
                    filter: { apple_id: song.apple_id },
                    update: { $set: song }, // Update w the latest song metadata
                    upsert: true // If it doesn't exist yet, create it
                }
            }));
            // Actually performs these sets of instructions
            await Song.bulkWrite(operations);
            console.log(`💾 Synced ${formattedSongs.length} songs to DB.`);
        }

        // TODO: Show DB first, THEN fill rest with API responses
        // Only show the top 15 choices
        const topFifteen = formattedSongs.slice(0, 15);

        // Send these top 15 to the user
        return res.json(topFifteen);

    } catch (error) {
        // You'll get 429 if Apple's API blocks the IP (somehow) for too many requests
        if (error.message.includes("Too many requests")) {
            return res.status(429).json({ error: error.message });
        }
        return res.status(500).json({ error: error.message });
    }
});

export default router;



/*import { Router } from 'express';
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

export default router;*/
