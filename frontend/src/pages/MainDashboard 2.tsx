import React from "react";
import { motion } from "framer-motion";
import { IoMdSettings, IoIosSearch } from "react-icons/io";
import { FaUser } from "react-icons/fa";


const items = [
  { id: 1, img: "https://placehold.co/400x600", title: "Desert Walk" },
  { id: 2, img: "https://placehold.co/500x400", title: "Soft Shadows" },
  { id: 3, img: "https://placehold.co/350x500", title: "Industrial Speaker" },
  { id: 4, img: "https://placehold.co/450x450", title: "Sculpture" },
  { id: 5, img: "https://placehold.co/300x450", title: "Abstract Hair" },
  { id: 6, img: "https://placehold.co/500x700", title: "Minimal Form" },
  { id: 7, img: "https://placehold.co/300x300", title: "Balance Mobile" },
  { id: 8, img: "https://placehold.co/400x500", title: "Studio Shot" },
];

export default function MainDashboard() {
  return (
    <div className="min-h-screen bg-[#0b0b0d] text-gray-200 p-6 cursor-default relative overflow-x-hidden">
      
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-10  
                      backdrop-blur-xl bg-white/5
                      shadow-lg rounded-2xl px-6 py-4 sticky top-4 z-20">

        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-linear-to-br from-gray-600 to-gray-800 rounded-xl"></div>
          <span className="text-xl font-semibold tracking-wide">MyMusicApp</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl px-10">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <IoIosSearch/>
            </span>
            <input
              type="text"
              placeholder="Search songs, artists, genres..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 
                         border border-white/10 text-gray-200
                         placeholder-gray-400
                         focus:outline-none focus:border-gray-500
                         transition"
            />
          </div>
        </div>

        {/* Profile + Settings */}
        <div className="flex items-center space-x-4">
          <button className="w-10 h-10 bg-white/10 rounded-xl border border-white/10 flex items-center justify-center">
            <FaUser />

          </button>
          <button className="w-10 h-10 bg-white/10 rounded-xl border border-white/10 flex items-center justify-center">
            <IoMdSettings />

          </button>
        </div>
      </div>

      {/* Subheader */}
      <div className="w-full py-8">
        <h1 className="text-4xl font-light tracking-tight mb-2">Discover</h1>
        <p className="text-gray-400 max-w-xl">
          Explore new tracks, artists, and visual song posters curated for you.
        </p>
      </div>

      {/* === Masonry Grid (Modernized Cards) === */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {items.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -4, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="break-inside-avoid rounded-2xl overflow-hidden bg-[#111]/80 
                       shadow-md hover:shadow-xl border border-white/5 
                       backdrop-blur-sm transition"
          >
            <img src={item.img} alt={item.title} className="w-full object-cover" />

            {/* Make appear on hover */}
            {/* <div className="p-5">
              <h3 className="text-lg font-medium tracking-wide">{item.title}</h3>
              <p className="text-gray-400 text-sm mt-1">Recommended for you</p>
            </div> */}
          </motion.div>
        ))}
      </div>

    </div>
  );
}
