import { useState } from "react";
import axios from "axios";
import Post from "./Post";
import TestPic from "/Users/asadchaudhry/Desktop/mymusicpage/frontend/src/assets/images/postpic.png";

export default function GiphyPicker() {
  const [searchTerm, setSearchTerm] = useState("");
  const [gifs, setGifs] = useState<any[]>([]);
  const [selectedGif, setSelectedGif] = useState<string>("");
  const [selectedGifUrl, setSelectedGifUrl] = useState<string>("");

  const API_KEY = "i5m8xmpOUgHNBUQWak3mcPvgeBunR8kl";

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
      params: {
        api_key: API_KEY,
        q: searchTerm,
        limit: 10,
      },
    });
    setGifs(response.data.data);
  };

  return (
    <div className="p-4">
      <h2>Search for a GIF</h2>
      <input
        type="text"
        placeholder="Type something..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 px-2 py-1 rounded"/>
        <button onClick={handleSearch} className="ml-2 px-3 py-1 bg-purple-500 text-white rounded cursor-pointer">
        Search </button>

      <div className="flex flex-wrap mt-4 gap-5">
        {gifs.map((gif) => (
          <img
            key={gif.id}
            src={gif.images.fixed_height.url}
            alt={gif.title}
            className={`m-[5px] cursor-pointer ${
              selectedGif === gif.images.fixed_height.url
                ? "border-3 border-purple-500"
                : "border-none"
            }`}
            onClick={() => {
              setSelectedGif(gif.images.fixed_height.url);
              setSelectedGifUrl(gif.images.fixed_height.url);
            }} />
        ))}
      </div>

      <Post
        imgLink={TestPic}
        size="PORTRAIT"
        songName="Shape of You"
        artistName="Ed Sheeran"
        background={selectedGifUrl}
      />
    </div>
  );
};

