import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import GiphyPicker from "./GiphyPicker";
import Post from "./Post";
import type { PostProps } from "./Post";
import { IoMdClose } from "react-icons/io";
export default function CreatePost() {
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [background, setBackground] = useState("");
  const [size, setSize] = useState<PostProps["size"]>("PORTRAIT");

  const toggleSize = () => {
    setSize(prev => (prev === "PORTRAIT" ? "SQUARE" : "PORTRAIT"));
  };

  const handleGifSelect = (gifUrl: string) => {
    setBackground(gifUrl);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUploadedFileUrl(url);
    setBackground(url);
  };

  const handleImgLinkChange = (value: string) => {
    setImgLink(value);
    if (value.trim() !== "" && background === "") {
      setBackground(value);
    }
  };

  return (
    <div className="w-full max-w-md bg-gray-800 rounded-2xl p-8 shadow-xl text-white my-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-center">Create a post</h2>
        <IoMdClose className="cursor-pointer hover:scale-105 transition" size={24} />
      </div>

      <div className="flex flex-col items-center gap-4">
        <label className="flex flex-col items-center cursor-pointer">
          <div className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-500 flex items-center justify-center transition">
            <FaPlus className="text-gray-300 hover:scale-105 transition" size={32} />
          </div>
          <span className="text-sm text-gray-300 mt-2">Upload Background</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>

        {/* Giphy Picker (lifted selection via callback) */}
        <GiphyPicker onSelectGif={handleGifSelect} />

        <input
          type="text"
          placeholder="Song Name"
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
          className="w-full bg-transparent border-2 border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none"/>

        <input
          type="text"
          placeholder="Song Artist"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          className="w-full bg-transparent border-2 border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none"/>

        <input
          placeholder="Image Link"
          value={imgLink}
          onChange={(e) => handleImgLinkChange(e.target.value)}
          className="w-full bg-transparent border-2 border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none"/>

          <button onClick={toggleSize} className="bg-purple-500 cursor-pointer rounded-xl py-3 font-semibold hover:scale-105 transition w-full"> Toggle Size </button>
        <div className="w-full mt-4">
          <h3 className="text-sm font-stretch-90% mb-2">Live Preview:</h3>
          <div className="flex justify-center">
            <Post
              imgLink={imgLink || uploadedFileUrl || "../images/stock.jpg"}
              size ={size}
              songName={songName || "Song Name"}
              artistName={artistName || "Song Artist"}
              background={background || imgLink || uploadedFileUrl || "../images/stock.jpg"}/>
          </div>
        </div>

        <div className="flex gap-4 mt-3 w-full">
          <button className="flex-1 cursor-pointer bg-purple-500 rounded-xl py-3 font-semibold hover:scale-105 transition">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
