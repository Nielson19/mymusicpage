import { useState } from "react";

export default function ShareButton({ playlistId }: { playlistId: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const url = `${window.location.origin}/playlist/${encodeURIComponent(playlistId)}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3500);
    });
  };

  return (
    <button
      onClick={handleShare}
      className="bg-white/10 px-6 py-2 rounded-xl hover:bg-white/20 transition cursor-pointer relative">
      Share {copied && ( <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded"> Link copied!</span> )}
    </button>
  );
}
