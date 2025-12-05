import { use, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import GiphyPicker from "./GiphyPicker";
import Post from "./Post";
import type { PostProps } from "./Post";
import Toggle from "./Toggle";
import InputSearch from "./InputSearch";
//----------------------------------------------------------------------------
import { useNavigate } from "react-router-dom";
//----------------------------------------------------------------------------

interface Song {
  appleId: string;
  name: string;
  artistName: string;
  albumName?: string;
  artworkUrl?: string | null;
  previewUrl?: string;
  releaseDate?: string;
  isStreamable: boolean;
}

export default function CreatePost({
  className = "",
  onClose,
}: {
  className?: string;
  onClose?: () => void;
}) {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [background, setBackground] = useState("");
  const [size, setSize] = useState<PostProps["size"]>("SQUARE");
  const [displayPreview, setDisplayPreview] = useState(false);
  // Navigation hook ----------------------------------------------------------------------------
  const navigate = useNavigate();
  //----------------------------------------------------------------------------
  const handleGifSelect = (gifUrl: string) => {
    setBackground(gifUrl);
  };

  const handleOutsideClick = () => {
    // Logic to close the CreatePost modal when clicking outside
    console.log("Clicked outside CreatePost");
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUploadedFileUrl(url);
    setBackground(url);
  };

  const handleAddPost = () => {
    // Logic to add the post
    console.log("Post added");
  };

  const toggleDisplayPreview = () => {
    // This function can be expanded to toggle preview display if needed
    setDisplayPreview(!displayPreview);
  };

  useEffect(() => {
    const element = document.querySelector(".preview-container") as HTMLElement;
    if (element) {
      if (displayPreview) {
        element.style.height = "auto";
        element.style.opacity = "1";
        element.style.transform = "scaleY(1)";
      } else {
        element.style.height = "0";
        element.style.opacity = "0";
        element.style.transform = "scaleY(0)";
      }
    }
  }, [displayPreview]);

  const handleImgLinkChange = (value: string) => {
    setImgLink(value);
    if (value.trim() !== "" && background === "") {
      setBackground(value);
    }
  };
  //----------------------------------------------------------------------------
  const handlePost = async () => {
    navigate("/profile/userid");

  }
  //----------------------------------------------------------------------------
  const handleSongSelect = (song: Song) => {
    setSelectedSong(song);
    setSongName(song.name);
    setArtistName(song.artistName);
    if (song.artworkUrl) {
      setBackground(song.artworkUrl);
    }
  };

  return (
    <div
      ref={handleOutsideClick}
      className={`w-full max-w-md bg-black/80 border border-gray-800 rounded-2xl p-8 shadow-xl text-white my-10 ${className} animate-fadeIn`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="flex flex-col w-full text-3xl font-semibold text-center">
          Create a post
        </h2>
      </div>

      <div className="flex flex-col items-center gap-4">
        {/* Giphy Picker (lifted selection via callback) */}
        <GiphyPicker onSelectGif={handleGifSelect} />

        <InputSearch
          placeholder="Search Music"
          size="LARGE"
          onSongSelect={handleSongSelect}
          className="w-full"
        />
        <div className="w-full flex flex-row gap-1">
          <div className="self-start flex items-center gap-3 w-full">
            <span className="text-sm text-gray-300">Portrait</span>

            <Toggle
              isOn={size === "SQUARE"}
              onChange={(val) => setSize(val ? "SQUARE" : "PORTRAIT")}
              defaultVal={size === "SQUARE"}
            />

            <span className="text-sm text-gray-300">Square</span>
          </div>
          <div className="self-start flex items-center gap-3 w-full justify-end">
            <Toggle
              isOn={displayPreview}
              onChange={toggleDisplayPreview}
              defaultVal={displayPreview}
            />

            <span className="text-sm text-gray-300">Preview</span>
          </div>
        </div>
        {displayPreview && (
          <div className="preview-container w-full mt-4 transition-all duration-300 ease-in-out origin-top">
            <h3 className="text-sm font-stretch-90% mb-2">Live Preview:</h3>
            <div className="flex justify-center">
              <Post
                userID={"preview-user"}
                songID={"preview-song"}
                imgLink={imgLink || uploadedFileUrl || "../images/stock.jpg"}
                size={size}
                songName={songName || "Song Name"}
                artistName={artistName || "Song Artist"}
                background={
                  background ||
                  imgLink ||
                  uploadedFileUrl ||
                  "../images/stock.jpg"
                }
              />
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-3 w-full">
          <button
            onClick={() => {
              handleAddPost();
              onClose?.();
            }}
            //----------------------------------------------------------------------------
            // onClick={handlePost}
            //----------------------------------------------------------------------------
            className="flex-1 cursor-pointer bg-purple-500 rounded-xl py-3 font-semibold hover:scale-105 transition"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
