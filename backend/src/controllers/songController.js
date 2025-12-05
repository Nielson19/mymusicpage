/*
TO-DO LIST:
* Convert trackId to a string and store as appleId (so you can make it unique).
* Parse releaseDate into a Date object for Mongo.
* For artwork, use artworkUrl100 by default, but change 100 to 600 for higher resolution if URL pattern supports it.
* If previewUrl is present AND isStreamable === true, mark isStreamable = true. Otherwise false.
* When saving, use upsert (findOneAndUpdate with upsert:true) to avoid duplicates and to allow repeated imports without duplicate songs.

*/

import { fetchItunesSearch } from '../services/itunesService.js';
import Song from '../models/songModel.js';

//https://itunes.apple.com/search?term={searchTerms}&limit=50&entity=song&media=music
// ?term=...
// req: Request, user input. res: Response, the data we'll send back
export const searchSongs = async (req, res) => {
  const { term } = req.query;
  // Should return something like this: { term: 'Adele' }

  // Browser way of handling errors
  // 400 Bad Request - Server cannot process request (syntax error)
  if (!term) return res.status(400).json({ error: 'Missing term' });

  try {
    // Text searching for relevant scoring. songName terms have double points compared to artistName terms.
    const dbSongs = await Song.find(
      { $text: { $search: term } }, // Looks into { name: 'text', artistName: 'text' }
      { score: { $meta: 'textScore' } } // Looks into text's metadata: { weights: { name: 2, artistName: 1 }}
    )
      .sort({ score: { $meta: 'textScore' } }) // Sort by weighted score
      .limit(15) // Only collect the info of the top 15.
      .lean(); // Turns score into a property (since apparently MongoDB can be weird about accessing the score field since it's technically an object.)

    // Only show results with a good enough matched score.
    const highQualityMatches = dbSongs.filter(song => song.score > 1.1);

    if (highQualityMatches.length >= 15) {
      console.log(`COMPLETE CACHE HIT: Found ${highQualityMatches.length} songs. Skipping API.`);
      return res.json(highQualityMatches);
    }
    else if (highQualityMatches.length == 0) {
      console.log(`COMPLETE CACHE MISS: Calling iTunes API...`);
    }
    else {
      console.log(`PARTIAL CACHE HIT: Found ${highQualityMatches.length} songs.`);
      console.log(`PARTIAL CACHE MISS: Calling iTunes API...`);
    }
    const apiSongs = await fetchItunesSearch(term, 50);

    // Fetch 50 songs, wait for this function to finish first though before moving on.

    const formattedSongs = apiSongs.map(song => ({
      appleId: String(song.trackId),
      name: song.trackName,
      artistName: song.artistName,
      albumName: song.collectionName,
      artworkUrl: song.artworkUrl100
        ? song.artworkUrl100.replace('100x100', '256x256')
        : null, // Increases artwork size to 256x256. If the artwork never existed though, just return null.
      previewUrl: song.previewUrl,
      releaseDate: song.releaseDate,
      isStreamable: Boolean(song.isStreamable && song.previewUrl && song.previewUrl.trim().length > 0)
    }));

    // Upserting / Bulk Writing
    if (formattedSongs.length > 0) {
      // Turns the list of songs into a list of instructions.
      const operations = formattedSongs.map(song => ({
        updateOne: {
          filter: { appleId: song.appleId },
          update: { $set: song }, // Update w the latest song metadata
          upsert: true // If it doesn't exist yet, create it
        }
      }));
      // Actually performs these sets of instructions
      await Song.bulkWrite(operations);
      console.log(`Synced ${formattedSongs.length} songs to DB.`);
    }

    // TODO: Show DB first, THEN fill rest with API responses
    // Only show the top 15 choices
    const topFifteen = formattedSongs.slice(0, 15);

    // Send these top 15 to the user
    return res.json(topFifteen);

  } catch (error) {
    // You'll get 429 if Apple's API blocks the IP (somehow) for too many requests
    if (error.message.includes('Too many requests')) {
      return res.status(429).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};




// song.appleId for finding and displaying posts
// posts hold the appleId