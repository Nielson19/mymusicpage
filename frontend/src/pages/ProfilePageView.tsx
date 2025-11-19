import React, { useState } from "react";
import MusicPlayerFeature from "../components/MusicPlayerFeature";
import {
  Upload,
  MoreHorizontal,
  SquarePen,
  Volume2,
  Palette,
  X,
} from "lucide-react";
import MasonryAdvanced from "../components/GeneralComp/MasonryAdvanced";
import { mockPlaylists } from "../components/GeneralComp/MockPlaylists";

function ProfilePageView() {
  const [activeTab, setActiveTab] = useState("Home");

  const galleryBlocks = [...Array(15)].map((_, i) => (
    <div key={i} className="bg-[#0E1117] w-full h-64 rounded-lg"></div>
  ));

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="relative w-full h-64 bg-gradient-to-b from-[#f767ff] to-[#590080] flex items-center justify-center">
        {/* Music player featured */}

        <div className="left-1/2 flex items-center justify-between shadow-2xl rounded-2xl">
          <MusicPlayerFeature />
        </div>

        <button className="absolute top-4 right-4 bg-white/40 p-3 rounded-md">
          <Volume2 className="text-white w-6 h-6" />
        </button>
      </div>

      <div className="w-full bg-white text-black pb-6 pt-12 relative">
        <button className="absolute top-6 left-6 bg-black w-10 h-10 rounded-xl flex items-center justify-center shadow-lg">
          <Palette className="text-white w-5 h-5" />
        </button>

        <div className="absolute top-4 right-6 flex items-center gap-3">
          <button className="flex items-center gap-1 bg-black text-white px-3 py-[6px] rounded-lg text-sm">
            <SquarePen className="w-4 h-4" />
            Create
          </button>

          <button className="bg-white border px-3 py-[6px] rounded-lg hover:bg-gray-100">
            <Upload className="w-4 h-4 text-black" />
          </button>

          <button className="bg-white border px-3 py-[6px] rounded-lg hover:bg-gray-100">
            <MoreHorizontal className="w-4 h-4 text-black" />
          </button>
        </div>

        <div className="flex items-start w-full px-20">
          <div className="pt-10 w-20" />

          <div className="flex-1 flex flex-col items-center -mt-16">
            <div className="w-32 h-32 bg-gray-300 rounded-md"></div>

            <h1 className="text-xl font-bold mt-4">Your Name</h1>
            <p className="text-gray-500 text-sm">Add headline</p>

            <a
              href="#"
              className="text-[#7C4DFF] text-sm mt-1 hover:text-[#9b6cff]"
            >
              patreon.com/ASMobbin
            </a>

            <div className="flex items-center gap-6 mt-4 text-gray-700">
              <X className="w-5 h-5" />
              <span className="text-sm">Edit</span>
            </div>
          </div>

          <div className="w-20"></div>
        </div>

        <div className="flex justify-center gap-8 mt-6 text-gray-600 text-sm border-b border-gray-300 pb-3">
          {[
            "Home",
            "Playlist1",
            "Playlist2",
            "Playlist3",
            "Playlist4",
            "Recommendations",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-1 ${
                activeTab === tab
                  ? "text-black font-semibold border-b-2 border-black"
                  : ""
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full bg-black px-4 py-8">
        <MasonryAdvanced
          dataSources={mockPlaylists}
          gap={16}
          minColumnWidth={200}
        />
      </div>
    </div>
  );
}

export default ProfilePageView;
