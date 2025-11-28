import React from "react";
import { motion } from "framer-motion";
import { IoMdSettings, IoIosSearch } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import MasonryAdvanced from "../components/GeneralComp/MasonryDynamic";
import type { DataSource } from "../components/GeneralComp/MasonryDynamic";

// Import your data sources
import { musicDataSources } from "../data/musicData";
import MusicPlayerStatic from "../components/MusicPlayerStatic";
import AppLogo from "../assets/icons/HeadphonesNoBG.png";
import { useNavigate } from "react-router-dom";

export default function MainDashboard() {
  const Navigate = useNavigate();
  const dataSources: DataSource[] = musicDataSources;

  //TODO: Create the conponent on the top to filter the different data sources one is "For You" and "Following"

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-gray-200 p-6 cursor-default relative overflow-x-hidden">
      {/* Header */}
      <div
        className="w-full flex items-center justify-between mb-10  
                      backdrop-blur-xl bg-white/5
                      shadow-lg rounded-2xl px-6 py-4 sticky top-4 z-20"
      >
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={AppLogo} alt="App Logo" className="w-20 h-20 rounded-xl" />
          <span className="text-xl font-semibold tracking-wide">
            MyMusicApp
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl px-10">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <IoIosSearch />
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
          <button
            onClick={() => {
              Navigate("/profile/username");
            }}
            className="w-10 h-10 bg-white/10 rounded-xl border border-white/10 flex items-center justify-center"
          >
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
      <MasonryAdvanced
        dataSources={dataSources}
        columnCount={7}
        distributionStrategy="source-per-column"
        gap={20}
        duplicateCount={5}
        infiniteScroll={true}
      />
      <MusicPlayerStatic />
    </div>
  );
}
