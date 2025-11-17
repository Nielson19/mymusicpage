import { useState } from "react";
import axios from "axios";
import Post from "./Post";
import TestPic from "/Users/asadchaudhry/Desktop/mymusicpage/frontend/src/assets/images/postpic.png";

type Props = {
  onSelectGif?: (gifUrl: string) => void;
};

export default function GiphyPicker({ onSelectGif }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [gifs, setGifs] = useState<any[]>([]);
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

  const handleSelect = (url: string) => {
    setSelectedGifUrl(url);
    if (onSelectGif) onSelectGif(url);
  };

  return (
    <div className="p-4 w-full">
      <h2 className="text-white">Or search for a GIF:</h2>
      <div className="flex justify-center my-3">

        <input
          type="text"
          placeholder="Type something..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 px-2 py-1 rounded w-2/3 focus:outline-none"/>

        <button onClick={handleSearch} className="ml-3 px-3 py-1 bg-purple-500 text-white rounded cursor-pointer">
          Search </button>
      </div>

      <div className="grid grid-cols-5">
        {gifs.map((gif) => (
          <img
            key={gif.id}
            src={gif.images.fixed_height.url}
            alt={gif.title}
            className={`m-[5px] cursor-pointer ${selectedGifUrl === gif.images.fixed_height.url ? "border-4 border-purple-500" : "border-none"}`}
            onClick={() => handleSelect(gif.images.fixed_height.url)}/>
        ))}
      </div>
    </div>
  );
}

