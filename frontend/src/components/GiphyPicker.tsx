import React, { useState } from "react";
import axios from "axios";
import Post from "./Post";
import TestPic from "/Users/asadchaudhry/Desktop/mymusicpage/frontend/src/assets/images/postpic.png"

const GiphyPicker: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [gifs, setGifs] = useState<any[]>([]);
  const [selectedGif, setSelectedGif] = useState<string | null>(null);
  const [selectedGifUrl, setSelectedGifUrl] = useState<string | null>(null);

  const API_KEY = "i5m8xmpOUgHNBUQWak3mcPvgeBunR8kl"; 

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    const response = await axios.get(
      `https://api.giphy.com/v1/gifs/search`,
      {
        params: {
          api_key: API_KEY,
          q: searchTerm,
          limit: 10,
        },
      }
    );
    setGifs(response.data.data);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Search for a GIF</h2>
      <input
        type="text"
        placeholder="Type something..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "1rem" }}>
        {gifs.map((gif) => (
          <img
            key={gif.id}
            src={gif.images.fixed_height.url}
            alt={gif.title}
            style={{
              margin: "5px",
              cursor: "pointer",
              border: selectedGif === gif.images.fixed_height.url ? "3px solid blue" : "none"
            }}
            onClick={() => {
              setSelectedGif(gif.images.fixed_height.url);
              setSelectedGifUrl(gif.images.fixed_height.url);
            }}
          />
        ))}
      </div>   
        <Post 
          imgLink={TestPic} 
          size="PORTRAIT" 
          songName="Baby"
          aristName="Justin Bieber"
          background={selectedGifUrl || undefined} />
    </div>
  );
};

export default GiphyPicker;
