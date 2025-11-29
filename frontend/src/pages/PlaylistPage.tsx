import React from "react";
import { useLocation, useParams } from "react-router-dom"; 
import { mockPlaylists } from "../components/GeneralComp/MockPlaylists";
import ShareButton from "../components/ShareButton";

const PlaylistPage: React.FC = () => {
  const location = useLocation();
  const params = useParams<{ id: string }>(); 

  const playlistFromState = location.state?.playlist;

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

  return (
    <div className="transition-opacity duration-500 ease-in opacity-0 animate-fadeIn">
    <div className="min-h-screen bg-[#0b0b0d] text-gray-200 cursor-default">
      {/* Header */}
      <div className="w-full h-64 md:h-80 bg-linear-to-b from-orange-300 to-pink-300 relative">
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

      {/* Playlist Actions */}
      <div className="flex items-center gap-4 px-6 py-6 border-b border-white/5">
        <button className="bg-purple-600 px-6 py-2 rounded-xl hover:bg-purple-700 transition cursor-pointer">
          Play
        </button>
        <ShareButton playlistId={playlist.id} />
        <button className="bg-white/10 px-6 py-2 rounded-xl hover:bg-white/20 transition cursor-pointer">
          Edit Playlist
        </button>
      </div>

      {/* Playlist Content */}
      <div className="px-6 py-6">
        <h2 className="text-2xl font-semibold mb-4 text-white text-underline">Tracks</h2>
        <ul className="flex flex-col gap-2">
          
          {playlist.items.map((song, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-2 rounded hover:bg-black/20 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <span className="w-6 text-gray-400">{index + 1}</span>
                <div className="flex flex-col">
                  <span className="text-gray-200">{song.songName}</span>
                  <span className="text-gray-400 text-sm">{song.artistName}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
  );
};

export default PlaylistPage;


