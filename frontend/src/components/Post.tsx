import { useState } from "react";
import React from "react";
import { BurgerMenu } from "./BurgerMenu";
import { FaPlus } from "react-icons/fa6";
import AddPlaylist from "./AddPlaylist";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";

export interface PostProps {
  userID: string;
  songID: string;
  imgLink: string;
  size: "SQUARE" | "PORTRAIT";
  iconDisplay?: boolean;
  songName: string;
  artistName: string;
  background?: string;
  audioLink?: string;
  // Optional JSON endpoint to resolve media fields from an API
  sourceJsonUrl?: string;
  // Optional mapping of JSON keys to Post media fields
  sourceMap?: {
    audio?: string; // e.g. "audioUrl"
    image?: string; // e.g. "coverUrl"
    background?: string; // e.g. "backgroundUrl"
    songName?: string; // e.g. "title"
    artistName?: string; // e.g. "artist"
  };
}

function Post({
  imgLink, // cover art (local path or remote URL)
  userID, // no need to display
  songID, // no need to display
  iconDisplay,
  size,
  songName,
  artistName,
  background = imgLink, // cover art by default
  audioLink,
  sourceJsonUrl,
  sourceMap,
}: PostProps) {
  const [liked, setLiked] = useState(false);
  const [showAddPlaylist, setShowAddPlaylist] = useState(false);
  const [iconsVisible, setIconsVisible] = useState({ iconDisplay });

  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [resolved, setResolved] = React.useState({
    imgLink,
    background,
    audioLink,
    songName,
    artistName,
  });

  React.useEffect(() => {
    let cancelled = false;

    const resolveFromJson = async () => {
      if (!sourceJsonUrl) {
        // no JSON: use direct props
        setResolved({
          imgLink,
          background,
          audioLink,
          songName,
          artistName,
        });
        return;
      }
      try {
        const res = await fetch(sourceJsonUrl, { credentials: "omit" });
        const data = await res.json();

        const map = {
          audio: sourceMap?.audio ?? "audioUrl",
          image: sourceMap?.image ?? "imgLink",
          background: sourceMap?.background ?? "background",
          songName: sourceMap?.songName ?? "songName",
          artistName: sourceMap?.artistName ?? "artistName",
        };

        const resolvedAudio = data?.[map.audio] ?? audioLink;
        const resolvedImage = data?.[map.image] ?? imgLink;
        const resolvedBackground =
          data?.[map.background] ?? background ?? resolvedImage;

        const resolvedSong = data?.[map.songName] ?? songName;
        const resolvedArtist = data?.[map.artistName] ?? artistName;

        if (!cancelled) {
          setResolved({
            imgLink: resolvedImage,
            background: resolvedBackground || resolvedImage,
            audioLink: resolvedAudio,
            songName: resolvedSong,
            artistName: resolvedArtist,
          });
        }
      } catch (e) {
        // fallback to props on error
        if (!cancelled) {
          setResolved({
            imgLink,
            background,
            audioLink,
            songName,
            artistName,
          });
        }
      }
    };

    resolveFromJson();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    sourceJsonUrl,
    JSON.stringify(sourceMap),
    imgLink,
    background,
    audioLink,
    songName,
    artistName,
  ]);
  const handleLike = () => {
    setLiked(!liked);
    console.log("Liked state:", !liked);
  };

  const handleMouseEnter = () => {
    if (resolved.audioLink && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };
  const handleMouseLeave = () => {
    if (resolved.audioLink && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleAddToPlaylist = () => {
    console.log("Add to Playlist clicked");
    setShowAddPlaylist(true);
  };

  const handleShare = () => {
    toast.success("Song link copied to clipboard!");
    navigator.clipboard.writeText(
      `${window.location.origin}/song/${encodeURIComponent(songID)}`
    );
  };

  return (
    <div
      className="group rounded-2xl overflow-hidden"
      data-user-id={userID}
      data-song-id={songID}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Overlay modal rendered to dashboard via portal */}
      {showAddPlaylist &&
        createPortal(
          <div className="fixed inset-0 z-[1000] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/80" />
            <AddPlaylist
              className="mx-auto max-h-[90vh] overflow-y-auto"
              onClose={() => setShowAddPlaylist(false)}
            />
          </div>,
          document.body
        )}

      {/* Hidden audio element for hover preview; supports local path or remote URL */}
      {resolved.audioLink && (
        <audio ref={audioRef} src={resolved.audioLink} preload="metadata" />
      )}

      <div
        className={`overflow-hidden ${
          size === "PORTRAIT" ? "w-64 h-96" : "w-64 h-64"
        }`}
      >
        <div
          className={`flex flex-col ${
            size === "PORTRAIT" ? "" : "aspect-square"
          } bg-cover bg-center bg-no-repeat justify-end relative w-full h-full group-hover:scale-105 transition-transform duration-500 rounded-2xl`}
          style={{
            backgroundImage: `url(${resolved.background})`,
          }}
        >
          {/* --- RIGHT SIDE ICONS --- */}
          {iconsVisible && ( // Added state to control visibility
            <div
              className="
              absolute right-7 top-5 flex flex-col gap-3
              opacity-0 translate-x-6 
              group-hover:opacity-100 group-hover:translate-x-0
              transition-all duration-500
            "
            >
              {/* Like Button */}
              <button
                onClick={() => handleLike()}
                className="
                w-10 h-10 rounded-full bg-black/60 backdrop-blur 
                flex items-center justify-center 
                hover:bg-black/80 transition
              "
              >
                <span
                  className={`text-xl transition-colors duration-300 ${
                    liked ? "text-red-500" : "text-white"
                  }`}
                >
                  ♥
                </span>
              </button>

              {/* Add/More Menu */}
              <BurgerMenu
                iconImage={<FaPlus className="text-white text-2xl" />}
                className="absolute w-10 h-10 rounded-lg bg-black/60 backdrop-blur 
                flex items-center justify-center 
                hover:bg-black/80 transition z-50
              "
                dropdownClassName="z-[1000] fixed top-[90px] right-[0px]" // ensure dropdown is above everything and not clipped
                items={[
                  {
                    label: "Add to Playlist",
                    onClick: () => {
                      console.log("Add to Playlist clicked");
                      handleAddToPlaylist();
                    },
                  },
                  {
                    label: "Share",
                    onClick: () => {
                      console.log("Share clicked");
                      handleShare();
                    },
                  },
                ]}
              />
            </div>
          )}
          {/* --- BOTTOM SONG INFO --- */}
          <div className="h-20% flex flex-row items-center justify-start gap-3 bg-linear-to-t from-black/0 group-hover:from-black/80 group-hover:via-black/50 to-transparent text-white p-4 space-x-2 transition-all duration-700">
            {/* Cover Art */}
            <div>
              <img
                src={resolved.imgLink}
                alt="Song cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "";
                }}
                className="w-12 h-12 aspect-square rounded-md shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              />
            </div>
            <div className="mb-2">
              <h3 className="opacity-0 text-lg text-white font-bold group-hover:opacity-100 transition-opacity duration-700">
                {resolved.songName}
              </h3>
              <p className="opacity-0 text-sm text-white group-hover:opacity-100 transition-opacity duration-900">
                {resolved.artistName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
