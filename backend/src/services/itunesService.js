import axios from 'axios';
import Bottleneck from 'bottleneck';

import { ErrorService } from './errorService.js';

const ITUNES_SEARCH_URL_BASE = 'https://itunes.apple.com/search';

// 1 per 3.333 seconds (18 requests/min)
const limiter = new Bottleneck({
  maxConcurrent: 1, // Only one request at a time
  minTime: 3_333 // 3.333 seconds apart
});

export async function fetchItunesSearch(raw_term, limit = 50) { // Exported function available for other files
  if (!raw_term) throw new Error('Term is required'); // If no term is provided, throw an error (crash the site cause this would ONLY be a developer-made issue)

  const clean_term = raw_term.trim();

  const params = new URLSearchParams({ // Setting up the params for the complete search_url
    term: clean_term, // URLSearchParams automatically accounts for symbols (such as & to %2F)
    limit: String(limit),
    entity: 'song',
    media: 'music'
  });
  // ex.: https://itunes.apple.com/search?term=kanye+west+in+paris&limit=50&entity=song&media=music

  const full_search_url = `${ITUNES_SEARCH_URL_BASE}?${params.toString()}`;

  try {
    // Bottleneck's limiter is in charge of scheduling the axios requests to Apple. Timeout in 15 secs.
    const response = await limiter.schedule(() => axios.get(full_search_url, { timeout: 15_000 }));
    // Service's internal way of handling errors
    if (!response || response.status !== 200) { /// If no response or error, throw an error w/ code for debugging
      throw new Error(`iTunes API error: ${response?.status}`);
    }
    return response.data.results; // Return results if we don't get an error
  }
  catch (error) {
    // If Apple's API blocked our IP for any reason
    if (error.response && error.response.status === 429) {
      console.warn('iTunes Search API rate limit hit!');
      throw new Error('Too many requests. Please wait a moment.');
    }
    ErrorService.captureException(error, { url: full_search_url });
    return []; // Empty list on error so we don't crash the site
  }
}

