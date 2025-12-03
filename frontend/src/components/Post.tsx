import { useState } from "react";

export interface PostProps {
  imgLink: string;
  size: "SQUARE" | "PORTRAIT";
  songName: string;
  artistName: string;
  background?: string;
}

function Post({
  imgLink,
  size,
  songName,
  artistName,
  background = imgLink,
}: PostProps) {
  const [liked, setLiked] = useState(false);

  if (background === "") {
    background = imgLink;
  }

  return (
    <div className="group rounded-2xl overflow-hidden relative">
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
                src={imgLink}
                alt="Song"
                className="w-12 h-12 aspect-square rounded-md shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              />
            </div>
            <div className="mb-2">
              <h3 className="opacity-0 text-lg text-white font-bold group-hover:opacity-100 transition-opacity duration-700">
                {songName}
              </h3>
              <p className="opacity-0 text-sm text-white group-hover:opacity-100 transition-opacity duration-900">
                {artistName}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Post;
