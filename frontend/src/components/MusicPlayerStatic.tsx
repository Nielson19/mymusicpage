  import React from "react";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaForward } from "react-icons/fa";
import { FaBackward } from "react-icons/fa";
import testAudio from "../assets/audio/Victory Lap Klop Remix 11-10.wav"; // Add this import
import ImageCoverPlaceholder from "../assets/images/postpic.png";

interface MusicPlayerStaticProps {
  songTitle?: string;
  artistName?: string;
  songDuration?: number; // in seconds
  songURL?: string;
  imageCoverURL?: string;
}
function MusicPlayerStatic(_props: MusicPlayerStaticProps) {
  const buttonHandle = () => {
    console.log("Button clicked");
  };

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  const audioRef = React.useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset time to beginning
      setCurrentTime(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Listen to audio events to update time
  React.useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => {
        setCurrentTime(audio.currentTime);
      };

      const updateDuration = () => {
        setDuration(audio.duration);
      };

      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", updateDuration);

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", updateDuration);
      };
    }
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 w-full flex flex-row justify-center items-center text-white p-4 z-50 overflow-auto"
      style={{ background: `url(${ImageCoverPlaceholder})` }}
    >
      {/* Hidden audio element */}
      <audio ref={audioRef} src={testAudio} preload="metadata" />
      <img
        src={ImageCoverPlaceholder}
        alt="Cover"
        className="w-16 h-16 mr-6 mt-1 rounded-2xl border-3 border-white"
      />
      <div className="flex-col flex">
        <div className="text-white font-light mb-2">Artist Name</div>
        <div className="text-white font-bold">Song Name</div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="flex-row flex justify-center items-center space-x-4 mx-8 mt-2">
          <button onClick={handleBackward} className="mr-1">
            <FaBackward className="mr-5" />
          </button>

          <button onClick={handlePlay} className="mx-1">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <button onClick={buttonHandle} className="ml-1">
            <FaForward className="ml-5" />
          </button>
        </div>

        <div>
          {/* Time Display  */}
          <div className="text-white font-light mt-4">
            {`${formatTime(currentTime)} / ${formatTime(duration)}`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayerStatic;
