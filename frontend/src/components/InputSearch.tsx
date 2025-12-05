import React, { useEffect, useRef, useState } from "react";
import Input from "./Input";
import { IoIosSearch } from "react-icons/io";

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

type InputSearchProps = {
  placeholder?: string;
  className?: string;
  size?: "SMALL" | "MEDIUM" | "LARGE";
  color?: { PRIMARY: string };
  icon?: React.ReactNode;
  data?: string[];
  onSelect?: (value: string) => void;
  onChange?: (value: string) => void;
  onSongSelect?: (song: Song) => void;
};

export default function InputSearch({
  placeholder = "Search Music",
  className,
  size = "MEDIUM",
  color = { PRIMARY: "#1E1E1E" },
  icon,
  data,
  onSelect,
  onChange,
  onSelect,
  onSongSelect,
}: InputSearchProps) {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleEnterSearch = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      const term = query.trim();
      if (term.length === 0) {
        setSongs([]);
        setOpen(false);
        return;
      }

      // If onSongSelect is provided, fetch from API
      if (onSongSelect) {
        setLoading(true);
        try {
          const response = await fetch(
            `http://localhost:3002/api/song/search?term=${encodeURIComponent(
              term
            )}`
          );

          const data = await response.json();

          // Check if response is an error object
          if (!response.ok || data.error) {
            console.error("API Error:", data.error || "Failed to fetch songs");
            alert(
              `Error: ${
                data.error ||
                "Failed to fetch songs. Make sure the backend is running."
              }`
            );
            setSongs([]);
            setOpen(false);
            return;
          }

          setSongs(data);
          setOpen(true);
        } catch (error) {
          console.error("Error searching songs:", error);
          alert(
            "Failed to connect to backend. Is the server running on port 3002?"
          );
          setSongs([]);
          setOpen(false);
        } finally {
          setLoading(false);
        }
      } else {
        // Fallback to old behavior if using with string data
        const mockData = data ?? [];
        const filtered =
          term.length === 0
            ? []
            : mockData
                .filter((x) => x.toLowerCase().includes(term.toLowerCase()))
                .slice(0, 5);
        setOpen(true);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const handleSelectSong = (song: Song) => {
    setQuery(`${song.name} - ${song.artistName}`);
    onSongSelect?.(song);
    setOpen(false);
  };

  const handleSelect = (value: string) => {
    setQuery(value);
    onSelect?.(value);
    onChange?.(value);
    setOpen(false);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <Input
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange?.(e.target.value);
        }}
        onKeyDown={handleEnterSearch}
        size={size}
        color={color}
        icon={icon}
        className="w-full"
      />
      {loading && (
        <div className="absolute left-0 top-full mt-2 w-full min-w-[260px] z-50 rounded-xl border border-gray-800 bg-[#1E1E1E] shadow-xl p-4 text-center text-gray-400">
          Searching...
        </div>
      )}
      {open && !loading && songs.length > 0 && onSongSelect && (
        <div className="absolute left-0 top-full mt-2 w-full min-w-[260px] z-50 rounded-xl border border-gray-800 bg-[#1E1E1E] shadow-xl max-h-[400px] overflow-y-auto">
          {songs.map((song) => (
            <button
              key={song.appleId}
              onClick={() => handleSelectSong(song)}
              className="w-full text-left px-4 py-3 text-gray-200 hover:bg-white/10 cursor-pointer border-b border-gray-800 last:border-b-0 flex items-center gap-3"
            >
              {song.artworkUrl && (
                <img
                  src={song.artworkUrl}
                  alt={song.name}
                  className="w-12 h-12 rounded object-cover"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{song.name}</div>
                <div className="text-sm text-gray-400 truncate">
                  {song.artistName}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
