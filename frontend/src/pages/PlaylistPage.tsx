import React, {useState} from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom"; 
import { mockPlaylists } from "../components/GeneralComp/MockPlaylists";
import ShareButton from "../components/ShareButton";
import Post from "../components/Post";
import { IoChevronBackSharp } from "react-icons/io5";
import { BurgerMenu } from "../components/BurgerMenu";
import { Edit } from "lucide-react";

const PlaylistPage: React.FC = () => {
  const location = useLocation();
  const params = useParams<{ id: string }>(); 

  const playlistFromState = location.state?.playlist;

  const navigate = useNavigate();

  const [shuffle, setShuffle] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  function PlayButton() {
    setShuffle(true)
    setCurrentSongIndex(Math.floor(Math.random() * playlist.items.length))
  }

  const id = params.id;
  const playlistFromId = id
    ? mockPlaylists.find((p) => p.id === decodeURIComponent(id))
    : undefined;
  
  const playlist = playlistFromState || playlistFromId;

  if (!playlist) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Playlist not found.
      </div>
    );
  }


  const items = [
    {
      label: "Share",
      onClick: () => {
        // all share logic here
        const url = `${window.location.origin}/playlist/${encodeURIComponent(playlist.id)}`;

        if (navigator.share) {
          navigator.share({ title: "Check out my playlist", url })
            .catch((err) => console.error("Share failed", err));
        } else if (navigator.clipboard?.writeText) {
          navigator.clipboard.writeText(url)
            .then(() => console.log("Link copied to clipboard"))
            .catch((err) => console.error("Copy failed", err));
        } else {
          window.prompt("Copy this link:", url);
        }
      },
    },
    {
      label: "Delete",
      onClick: () => {
        const confirmed = window.confirm("Are you sure you want to delete this playlist?");
        if (!confirmed) return;

        console.log("Deleted playlist", playlist.Id);
        // e.g. API call or state update here
      },
    },
  ];

  return (
    <div className="transition-opacity duration-500 ease-in opacity-0 animate-slideUpFade">
        <div className="min-h-screen bg-[#0b0b0d] text-gray-200 cursor-default">
          {/* Header */}
          <div className="w-full h-64 md:h-80 bg-linear-to-b from-orange-300 to-pink-300 relative">
            <div className="relative top-4 left-0 right-0 flex flex-row px-4 justify-between ">
              {/* Back Button */}
              <button onClick={() => {navigate(`/profile/:username`);}} className="bg-gray-800 p-3 rounded-xl cursor-pointer">
                <IoChevronBackSharp className="text-white w-4 h-4" />
              </button>

              {/* Burger Menu*/}
              <div className="z-200 bg-gray-800 p-2 rounded-xl cursor-pointer">
                <BurgerMenu className=" cursor-pointer text-white" dropdownClassName="text-white right-0 mt-4" items={items} />
              </div>
            </div>
            
            <div className="absolute bottom-4 left-6 flex items-center gap-4">
              <img
                src={playlist.coverImg || "https://placehold.co/150x150/png"}
                alt="cover"
                className="w-32 h-32 md:w-40 md:h-40 rounded-xl shadow-xl object-cover"
              />


              <div>
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-black">
                  {playlist.name}
                </h1>

                <p className="text-black/80 text-lg mt-1">
                  {playlist.description || "A collection of tracks."}
                </p>

                <div className="flex items-center gap-3 mt-4">
                  <img
                    src={playlist.creatorImg || "https://placehold.co/40x40"}
                    alt="creator"
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-black/80">{playlist.creatorName || "Unknown"}</span>
                </div>
              </div>
            </div>
          </div>
        

          
          {/* Playlist Content */}
          <div className="flex mt-12 gap-5 justify-center flex-wrap">
          {playlist.items.map((song, index) => (
            <Post
                key={song.id || index}
                imgLink={song.imgLink || "https://placehold.co/150x150/png"}
                size={song.size}
                songName={song.songName}
                artistName={song.artistName}
                background={song.imgLink} userID={""} songID={""}      />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;