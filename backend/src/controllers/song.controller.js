/*
TO-DO LIST:
* Convert trackId to a string and store as apple_id (so you can make it unique).
* Parse releaseDate into a Date object for Mongo.
* For artwork, use artworkUrl100 by default, but change 100 to 600 for higher resolution if URL pattern supports it.
* If previewUrl is present AND isStreamable === true, mark is_streamable = true. Otherwise false.
* When saving, use upsert (findOneAndUpdate with upsert:true) to avoid duplicates and to allow repeated imports without duplicate songs.

*/

search_terms = "";

//https://itunes.apple.com/search?term=TERM1+TERM2&limit=50&entity=song&media=music
//https://itunes.apple.com/search?term={search_terms}&limit=50&entity=song&media=music