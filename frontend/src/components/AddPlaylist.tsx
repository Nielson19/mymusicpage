import { useEffect, useState } from "react";
import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.jpg";
import image4 from "../assets/images/image4.jpg";
import image5 from "../assets/images/image5.jpg";
import image6 from "../assets/images/image6.jpg";
import image7 from "../assets/images/image7.jpg";
import image8 from "../assets/images/image8.jpg";
import image9 from "../assets/images/image9.jpg";
import image10 from "../assets/images/image10.jpg";

export default function AddPlaylist({
  className = "",
}: {
  className?: string;
}) {
  const [playlists] = useState([
    { id: "pl-1", name: "Daily Mix", banner: image1 },
    { id: "pl-2", name: "Focus Beats", banner: image2 },
    { id: "pl-3", name: "Chill Vibes", banner: image3 },
    { id: "pl-4", name: "Top Hits", banner: image4 },
    { id: "pl-5", name: "Workout Pump", banner: image5 },
    { id: "pl-6", name: "Late Night", banner: image6 },
    { id: "pl-7", name: "Indie Essentials", banner: image7 },
    { id: "pl-8", name: "Jazz Classics", banner: image8 },
    { id: "pl-9", name: "Hip-Hop Central", banner: image9 },
    { id: "pl-10", name: "Throwbacks", banner: image10 },
  ]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(
    null
  );

  const selectedPlaylist =
    playlists.find((p) => p.id === selectedPlaylistId) || null;

  const handleOutsideClick = () => {
    // Logic to close when clicking outside (kept for parity)
    console.log("Clicked outside AddPlaylist");
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleSelect = (id: string) => {
    setSelectedPlaylistId(id);
  };

  const handleAdd = () => {
    if (!selectedPlaylist) {
      console.log("No playlist selected");
      return;
    }
    console.log("Selected playlist:", selectedPlaylist);
  };

  return (
    <div
      ref={handleOutsideClick as unknown as React.RefObject<HTMLDivElement>}
      className={`w-full max-w-md bg-black/80 border border-gray-800 rounded-2xl p-8 shadow-xl text-white my-10 ${className} animate-fadeIn`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="flex flex-col w-full text-3xl font-semibold text-center">
          Your Playlists
        </h2>
      </div>

      <div className="flex flex-col items-center gap-4">
        {/* Scrollable list (keeps same snap/size styling) */}
        <div className="flex flex-col overflow-y-auto snap-y snap-mandatory h-[250px] no-scrollbar w-full gap-3">
          {playlists.map((pl) => (
            <button
              key={pl.id}
              onClick={() => handleSelect(pl.id)}
              className={`relative w-full h-[250px] rounded-md overflow-hidden snap-start border-2 transition 
                ${
                  selectedPlaylistId === pl.id
                    ? "border-purple-500"
                    : "border-transparent"
                }`}
            >
              <img
                src={pl.banner}
                alt={pl.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-4 py-2 text-left">
                <span className="text-white font-semibold">{pl.name}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Preview area (same structure and animation container) */}
        {selectedPlaylist && (
          <div className="preview-container w-full mt-4 transition-all duration-300 ease-in-out origin-top">
            <h3 className="text-sm font-stretch-90% mb-2">Preview:</h3>
            <div className="flex justify-center">
              <div className="w-64 h-64 rounded-2xl overflow-hidden border border-white/20">
                <img
                  src={selectedPlaylist.banner}
                  alt={selectedPlaylist.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* Keep same bottom buttons */}
        <div className="flex gap-4 mt-3 w-full">
          <button
            onClick={handleAdd}
            className="flex-1 cursor-pointer bg-purple-500 rounded-xl py-3 font-semibold hover:scale-105 transition"
          >
            Post
          </button>
          <button
            className="flex-1 bg-gray-700 cursor-pointer rounded-xl py-3 font-semibold hover:scale-105 transition"
            onClick={() => console.log("Cancel")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
