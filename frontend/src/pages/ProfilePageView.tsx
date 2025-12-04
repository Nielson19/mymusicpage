import React, { useState } from "react";
import MusicPlayerFeature from "../components/MusicPlayerFeature";
import Profile from "../components/ProfilePicture";
import {
  Upload,
  Share2,
  MoreHorizontal,
  SquarePen,
  Volume2,
  Palette,
  Home,
  X,
  VolumeX,
} from "lucide-react";
import { mockPlaylists } from "../components/GeneralComp/MockPlaylists";
import MasonryDynamic from "../components/GeneralComp/MasonryDynamic";
import { useNavigate } from "react-router-dom";
import CreatePost from "../components/CreatePost";
import { BurgerMenu } from "../components/BurgerMenu";

function ProfilePageView() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Home");

  const [createPostOpen, setCreatePostOpen] = React.useState(false);
  const [createPlaylistOpen, setCreatePlaylistOpen] = React.useState(false);
  const outsideClickRef = React.useRef<HTMLDivElement>(null);

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

  const handleOpenCreatePost = () => {
    setCreatePostOpen(true);
  };

  const handleCreatePlaylist = () => {
    setCreatePlaylistOpen(true);
  };

  const [dark, setDark] = useState(false);
  const [mute, setMute] = useState(false);

  const tabs = ["Home", ...mockPlaylists.map((p) => p.name), "Recommendations"];

  const tabToPlaylist: Record<string, typeof mockPlaylists> = {
    Home: mockPlaylists,
    Recommendations: mockPlaylists.slice(-1),
  };

  mockPlaylists.forEach((playlist) => {
    tabToPlaylist[playlist.name] = [playlist];
  });

  function themeButton() {
    setDark((prevClick) => !prevClick);
  }

  function handleMute() {
    setMute((prevClick) => !prevClick);
  }

  function onTabClick(tab: string) {
    if (tab === "Home" || tab === "Recommendations") {
      setActiveTab(tab);
      return;
    }

    const playlist = mockPlaylists.find((p) => p.name === tab);
    if (playlist && playlist.id) {
      navigate(`/playlist/${encodeURIComponent(String(playlist.id))}`, {
        state: { playlist },
      });
    } else {
      setActiveTab(tab);
    }
  }

  return (
    <div
      className={`min-h-screen flex flex-col ${
        dark
          ? "bg-black text-white transition-colors duration-300 ease-in-out"
          : "bg-white text-black transition-colors duration-300 ease-in-out"
      }`}
    >
      {createPostOpen && (
        <div className="z-100 w-screen h-screen bg-black/90 flex items-center justify-center fixed top-0 left-0">
          <div ref={outsideClickRef}>
            <CreatePost className="mx-auto max-h-[90vh] overflow-y-auto" />
          </div>
        </div>
      )}
      {/* TODO: Top banner  this is where the input goes when selecting one */}
      <div className="relative w-full h-64 bg-linear-to-b from-[#f767ff] to-[#590080] flex items-center justify-center">
        <div className="left-1/2 flex items-center justify-between shadow-2xl rounded-2xl">
          <MusicPlayerFeature muted={mute} />
        </div>

        <button
          onClick={handleMute}
          className={`absolute top-4 right-4 p-2 w-10 h-10 rounded-xl bg-gray-800 border border-white/10 flex items-center justify-center`}
        >
          {mute ? (
            <VolumeX className="text-white w-8 h-8" />
          ) : (
            <Volume2 className="text-white w-8 h-8" />
          )}
        </button>

        <button
          onClick={() => {
            navigate("/");
          }}
          className="absolute top-4 left-6 w-10 h-10 rounded-xl bg-gray-800 border border-white/10 flex items-center justify-center"
        >
          <Home className="text-white w-4 h-4" />
        </button>
      </div>

      <div className={`w-full pb-6 pt-12 relative bg-transparent`}>
        {/* Palette Button for Theme */}
        <button
          onClick={themeButton}
          className={`absolute top-3 left-6 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
            dark ? "bg-purple-500 text-white" : "bg-black text-white"
          }`}
        >
          <Palette className="text-white w-5 h-5" />
        </button>

        {/* create post Button */}

        <div className="absolute top-4 right-6 flex items-center gap-3">
          <BurgerMenu
            iconImage={<SquarePen className="w-4 h-4" />}
            label="Create"
            className={`px-4 py-2 font-bold rounded-xl border flex flex-row items-center justify-center gap-2
               ${
                 dark
                   ? "border-white/30 text-white transition-colors ease-in-out duration-300 bg-white/10"
                   : "border-black/30 text-black transition-colors ease-in-out duration-300 bg-black/10"
               }`}
            items={[
              {
                className: "text-white font-bold",
                label: "Post",
                onClick: () => {
                  handleOpenCreatePost;
                },
              },
              {
                className: "text-white font-bold",
                label: "Playlist",
                onClick: () => {
                  handleCreatePlaylist;
                },
              },
            ]}
          />

          <button
            className={` px-3 py-3 rounded-lg transition-colors flex items-center justify-center border ${
              dark
                ? "border-white/30 text-white transition-colors duration-300 ease-in-out bg-white/10"
                : "border-black/30 text-black transition-colors duration-300 ease-in-out"
            }`}
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            className={`px-3 py-3 rounded-lg transition-colors flex items-center justify-center border ${
              dark
                ? "border-white/30 text-white transition-colors ease-in-out duration-300 bg-white/10"
                : "border-black/30 text-black transition-colors ease-in-out duration-300"
            }`}
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-start w-full px-20">
          <div className="pt-10 w-20" />

          <div className="flex-1 flex flex-col items-center -mt-16">
            {/* Profile Page Section */}
            <div className="w-32 h-32 flex items-center justify-center bg-gray-300 rounded-md">
              <Profile />
            </div>

            {/* TODO Add username on input */}
            <h1 className="text-xl font-bold mt-4">Your Name</h1>
            <p
              className={`text-md ${dark ? "text-gray-400" : "text-gray-600"}`}
            >
              {/* TODO add the followers count dynamically */}
              Followers: 120
            </p>

            <a
              href="#"
              className="text-[#7C4DFF] text-sm mt-1 hover:text-[#9b6cff]"
            ></a>

            <div className="flex items-center gap-6 mt-4 text-gray-700">
              {/* <X className="w-5 h-5" />
              <span className="text-sm">Edit</span> */}
            </div>
          </div>

          <div className="w-20"></div>
        </div>
      </div>
      <div
        className={`transition-opacity duration-[1500ms] ease-in-out opacity-0`}
        style={{ animation: "fadeIn 1.5s forwards" }}
      >
        <div className={`w-full px-4 py-8`}>
          <MasonryDynamic
            dark={dark}
            dataSources={tabToPlaylist[activeTab] || []}
            gap={16}
            minColumnWidth={200}
            columnCount={5}
            infiniteScroll={true}
            duplicateCount={5}
            distributionStrategy="source-per-column"
            onPlaylistClick={(playlistId) =>
              navigate(`/playlist/${encodeURIComponent(playlistId)}`, {
                state: {
                  playlist: mockPlaylists.find((p) => p.id === playlistId),
                },
              })
            }
          />
        </div>
      </div>

      <MusicPlayerStatic />
    </div>
  );
}

export default ProfilePageView;
