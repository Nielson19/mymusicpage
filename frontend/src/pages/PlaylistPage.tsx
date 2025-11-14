import React from "react";

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
}

const mockTracks: Track[] = [
  { id: 1, title: "Best Boss Ever", artist: "Michael Scott", duration: "3:12" },
  { id: 2, title: "My Beet Farm", artist: "Dwight Schrute", duration: "4:01" },
  { id: 3, title: "Did I Stutter", artist: "Stanley Hudson", duration: "2:48" },
];

const PlaylistPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0b0b0d] text-gray-200 cursor-default">

      {/* Header */}
      <div className="w-full h-64 md:h-80 bg-linear-to-b from-orange-300 to-pink-300 relative">
        <div className="absolute bottom-4 left-6 flex items-center gap-4">
          <img
            src="https://placehold.co/150x150/png"
            alt="cover"
            className="w-32 h-32 md:w-40 md:h-40 rounded-xl shadow-xl object-cover"
          />

          <div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-black">
              My Synthwave Playlist
            </h1>

            <p className="text-black/80 text-lg mt-1">
              A collection of neon nostalgia & retro vibes.
            </p>

            <div className="flex items-center gap-3 mt-4">
              <img
                src="https://placehold.co/40x40"
                alt="creator"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-black/80">Alex Smith</span>
            </div>
          </div>
        </div>
      </div>

      {/* Playlist Actions */}
      <div className="flex items-center gap-4 px-6 py-6 border-b border-white/5">
        <button className="bg-purple-600 px-6 py-2 rounded-xl hover:bg-purple-700 transition cursor-pointer">
          Play
        </button>
        <button className="bg-white/10 px-6 py-2 rounded-xl hover:bg-white/20 transition cursor-pointer">
          Share
        </button>
        <button className="bg-white/10 px-6 py-2 rounded-xl hover:bg-white/20 transition cursor-pointer">
          Edit Playlist
        </button>
      </div>

      {/* Track List */}
      <div className="px-6 py-10">
        <h2 className="text-xl font-light tracking-wide mb-6">Tracks</h2>

        <div className="divide-y divide-white/5 border border-white/10 rounded-xl overflow-hidden">
          {mockTracks.map((track, index) => (
            <div
              key={track.id}
              className="flex items-center justify-between p-4 hover:bg-white/5 transition cursor-pointer"
            >
              {/* Left Side */}
              <div className="flex items-center gap-4">
                <span className="text-gray-400 w-6 text-right">{index + 1}</span>

                {/* Placeholder thumbnail */}
                <div className="w-14 h-14 bg-white/10 rounded-lg" />

                <div>
                  <h3 className="text-lg font-medium">{track.title}</h3>
                  <p className="text-gray-400 text-sm">{track.artist}</p>
                </div>
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-6">
                <span className="text-gray-300">{track.duration}</span>

                <button className="text-gray-400 hover:text-gray-200">
                  •••
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PlaylistPage;
