import React, { useContext } from "react";
import { SquarePen } from "lucide-react";
import { IoMdSettings, IoIosSearch } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import type { DataSource } from "../components/GeneralComp/MasonryDynamic";

import { UserContext } from "../../context/userContext";
// Import your data sources
import { musicDataSources } from "../data/musicData";
import MusicPlayerStatic from "../components/MusicPlayerStatic";
import AppLogo from "../assets/icons/HeadphonesNoBG.png";
import { useNavigate } from "react-router-dom";
import CreatePost from "../components/CreatePost";
import CreatePlaylist from "../components/CreatePlaylist";
import InputSearch from "../components/InputSearch";
import MasonryDynamic from "../components/GeneralComp/MasonryDynamic";
import { BurgerMenu } from "../components/BurgerMenu";

export default function MainDashboard() {
  const Navigate = useNavigate();
  const dataSources: DataSource[] = musicDataSources;
  const [createPostOpen, setCreatePostOpen] = React.useState(false);
  const [createPlaylistOpen, setCreatePlaylistOpen] = React.useState(false);
  const outsideClickRef = React.useRef<HTMLDivElement>(null);
  const { user } = useContext(UserContext);
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      outsideClickRef.current &&
      !outsideClickRef.current.contains(event.target as Node)
    ) {
      setCreatePostOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleCreatePlaylist = () => {
    // Implement playlist creation logic here
    setCreatePlaylistOpen(true);
  };

  const handleOpenCreatePost = () => {
    setCreatePostOpen(true);
  };

  //TODO: Create the conponent on the top to filter the different data sources one is "For You" and "Following"

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-gray-200 p-6 cursor-default relative overflow-x-hidden animate-slideUpFade">
      {createPostOpen && (
        <div className="z-100 w-screen h-screen bg-black/90 flex items-center justify-center fixed top-0 left-0">
          <div ref={outsideClickRef}>
            <CreatePost className="mx-auto max-h-[90vh] overflow-y-auto" />
          </div>
        </div>
      )}
      {createPlaylistOpen && (
        <div className="z-100 w-screen h-screen bg-black/90 flex items-center justify-center fixed top-0 left-0">
          <div>
            <CreatePlaylist
              className="mx-auto max-h-[90vh] overflow-y-auto"
              onClose={() => setCreatePlaylistOpen(false)}
            />
          </div>
        </div>
      )}
      {/* Header */}
      <div
        className="w-full flex items-center justify-between mb-10  
                      backdrop-blur-xl bg-white/5
                      shadow-lg rounded-2xl px-6 py-4 sticky top-4 z-20"
      >
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => Navigate("/")}
            aria-label="Go to Home"
            className="rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            <img
              src={AppLogo}
              alt="App Logo"
              className="w-20 h-20 rounded-xl"
            />
          </button>
          <span className="text-xl font-semibold tracking-wide">
            MyMusicApp
          </span>
        </div>

        <InputSearch className="w-1/3" icon={<IoIosSearch />} />

        {/* Profile + Settings */}
        <div className="flex items-center space-x-4 gb-white">
          <BurgerMenu
            iconImage={<SquarePen className="w-4 h-4" />}
            buttonLabel="Create"
            dropdownClassName="fixed top-[80px]"
            className="px-4 py-2 font-bold rounded-xl border flex flex-row items-center justify-center gap-2 border-white/30 bg-white text-black transition-colors ease-in-out duration-300"
            items={[
              {
                className: "text-white font-bold",
                label: "Post",
                onClick: () => {
                  handleOpenCreatePost();
                },
              },
              {
                className: "text-white font-bold",
                label: "Playlist",
                onClick: () => {
                  handleCreatePlaylist();
                },
              },
            ]}
          />
          <button
            onClick={() => {
              Navigate("/profile/username");
            }}
            className="w-10 h-10 bg-white/10 rounded-xl border border-white/10 flex items-center justify-center"
          >
            <FaUser />
          </button>
          <BurgerMenu
            iconImage={<IoMdSettings />}
            dropdownClassName="fixed top-20 right-6"
            items={[
              {
                className: "text-red-500 font-bold",
                label: "Logout",
                onClick: () => {
                  Navigate("/login");
                },
              },
            ]}
            className="w-10 h-10 bg-white/10 rounded-xl border border-white/10 flex items-center justify-center"
          />
        </div>
      </div>

      {/* Subheader */}
      <div className="w-full py-8">
        <h1 className="text-4xl font-light tracking-tight mb-2">
          Welcome {user.username || "Master"}!
        </h1>
        <p className="text-gray-400 max-w-xl">
          Explore new tracks, artists, and visual song posters curated for you.
        </p>
      </div>
      <MasonryDynamic
        dark={true}
        dataSources={dataSources}
        columnCount={7}
        minColumnWidth={200}
        distributionStrategy="round-robin"
        gap={40}
        duplicateCount={5}
        infiniteScroll={true}
      />
      {!createPostOpen && <MusicPlayerStatic />}
    </div>
  );
}
