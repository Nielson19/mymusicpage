import { useState } from "react";

export interface PostProps {
  userID: string;
  songID: string;
  imgLink: string;
  size: "SQUARE" | "PORTRAIT";
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
  size,
  songName,
  artistName,
  background = imgLink, // cover art by default
  audioLink,
  sourceJsonUrl,
  sourceMap,
}: PostProps) {
  const [liked, setLiked] = useState(false);

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

  return (
    <div
      className="group rounded-2xl overflow-hidden"
      data-user-id={userID}
      data-song-id={songID}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Hidden audio element for hover preview; supports local path or remote URL */}
      {resolved.audioLink && (
        <audio ref={audioRef} src={resolved.audioLink} preload="metadata" />
      )}

      <div
        className={`w-64 h-64 overflow-hidden ${
          size === "PORTRAIT" ? "h-96" : ""
        }`}
      >
        <div
          className="flex flex-col aspect-square bg-cover bg-center bg-no-repeat justify-end relative w-full h-full group-hover:scale-105 transition-transform duration-500 rounded-2xl"
          style={{
            backgroundImage: `url(${background})`,
          }}
        >
          {/* --- RIGHT SIDE ICONS --- */}
          <div
            className="
              absolute right-3 top-3 flex flex-col gap-3
              opacity-0 translate-x-6 
              group-hover:opacity-100 group-hover:translate-x-0
              transition-all duration-500
            "
          >
            {/* Like Button */}
            <button
              onClick={() => setLiked(!liked)}
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

            {/* Add to Playlist Button */}
            <button
              className="
                w-10 h-10 rounded-full bg-black/60 backdrop-blur 
                flex items-center justify-center 
                hover:bg-black/80 transition
              "
            >
              <span className="text-white text-2xl">＋</span>
            </button>
          </div>

          {/* --- BOTTOM SONG INFO --- */}
          <div className="w-full h-20% flex flex-row items-center justify-start gap-2 bg-linear-to-t from-black/0 group-hover:from-black/80 group-hover:via-black/50 to-transparent text-white p-4 space-x-3 transition-all duration-700">
            <div>
              <img
                src={resolved.imgLink}
                alt="Song"
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
