import { useEffect, useRef, useState } from "react";
import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.jpg";
export default function AddPlaylist({
  className = "",
  isOpen = true,
  onClose,
}: {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const [playlists] = useState([
    { id: "pl-1", name: "Daily Mix", banner: image1 },
    { id: "pl-2", name: "Focus Beats", banner: image2 },
    { id: "pl-3", name: "Chill Vibes", banner: image3 },
  ]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(
    null
  );
  const selectedPlaylist =
    playlists.find((p) => p.id === selectedPlaylistId) || null;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!isOpen) return;
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        onClose?.();
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  const handleSelect = (id: string) => setSelectedPlaylistId(id);
  const handleAdd = () => {
    if (!selectedPlaylist) {
      console.log("No playlist selected");
      setSelectedPlaylistId(null);
      return;
    }
    console.log("Selected playlist:", selectedPlaylist);
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80" />
      {/* Centered modal */}
      <div
        ref={containerRef}
        className={`relative w-full max-w-md bg-black/80 border border-gray-800 rounded-2xl p-8 shadow-xl text-white my-10 animate-fadeIn ${className}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="flex flex-col w-full text-3xl font-semibold text-center">
            Your Playlists
          </h2>
        </div>

        <div className="flex flex-col h-1/4 items-center gap-4">
          <div
            className="flex flex-col w-full gap-3 overflow-y-auto snap-y snap-mandatory max-h-[50vh] rounded-md"
            style={{ scrollbarWidth: "thin" }}
          >
            {playlists.map((pl) => (
              <button
                key={pl.id}
                onClick={() => handleSelect(pl.id)}
                className={`relative w-full h-[250px] rounded-md overflow-hidden snap-start border-5 transition ${
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

          <div className="flex gap-4 mt-3 w-full">
            <button
              onClick={handleAdd}
              className="flex-1 cursor-pointer bg-purple-500 rounded-xl py-3 font-semibold hover:scale-105 transition"
            >
              Save Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
