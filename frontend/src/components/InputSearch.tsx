import React, { useEffect, useRef, useState } from "react";
import Input from "./Input";

type InputSearchProps = {
  placeholder?: string;
  className?: string;
  size?: "SMALL" | "MEDIUM" | "LARGE";
  color?: { PRIMARY: string };
  icon?: React.ReactNode;
  data?: string[];
  onSelect?: (value: string) => void;
  onChange?: (value: string) => void;
};

export default function InputSearch({
  placeholder = "Search Music",
  className,
  size = "MEDIUM",
  color = { PRIMARY: "#1E1E1E" },
  icon,
  data,
  onChange,
  onSelect,
}: InputSearchProps) {
  const mockData = data ?? [
    "Drake - One Dance",
    "Drake - God's Plan",
    "Billie Eilish - Bad Guy",
    "Dua Lipa - Levitating",
    "The Weeknd - Blinding Lights",
    "Taylor Swift - Lover",
    "Adele - Hello",
    "Kendrick Lamar - HUMBLE.",
    "Ed Sheeran - Shape of You",
  ];

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
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

  const handleEnterSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const term = query.trim().toLowerCase();
      const filtered =
        term.length === 0
          ? []
          : mockData.filter((x) => x.toLowerCase().includes(term)).slice(0, 5);
      setResults(filtered);
      setOpen(true);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const handleSelect = (value: string) => {
    setQuery(value);
    onSelect?.(value);
    setOpen(false);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <Input
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleEnterSearch}
        size={size}
        color={color}
        icon={icon}
        className="w-full"
      />
      {open && results.length > 0 && (
        <div className="absolute left-0 top-full mt-2 w-full min-w-[260px] z-50 rounded-xl border border-gray-800 bg-[#1E1E1E] shadow-xl">
          {results.map((item) => (
            <button
              key={item}
              onClick={() => handleSelect(item)}
              className="w-full text-left px-4 py-2 text-gray-200 hover:bg-white/10 cursor-pointer rounded-xl"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
