import { CiLock } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import Input from "./Input";
import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.jpg";
import image4 from "../assets/images/image4.jpg";
import image5 from "../assets/images/image5.jpg";
import image6 from "../assets/images/image6.jpg";
import image7 from "../assets/images/image7.jpg";
import image8 from "../assets/images/image8.jpg";
import image9 from "../assets/images/image9.jpg";
import image10 from "../assets/images/image10.jpg";
import { useEffect, useRef } from "react";

export default function CreatePlaylist({
  className = "",
  onClose,
}: {
  className?: string;
  onClose?: () => void;
}) {
  const imgs = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (containerRef.current && !containerRef.current.contains(target)) {
        onClose?.();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  function imgSelected() {
    console.log("Hello");
    // image selected logic
  }

  const mapImages = imgs.map((img, i) => (
    <img
      onClick={imgSelected}
      key={i}
      src={img}
      alt="background"
      className={`w-full h-[250px] object-cover shrink-0 snap-start rounded-md`}
    />
  ));

  return (
    <div
      className={`w-full max-w-md bg-black/80 border border-gray-800 rounded-2xl p-8 shadow-xl text-white my-10 animate-fadeIn ${className}`}
    >
      <div
        ref={containerRef}
        className="w-full max-w-md bg-black rounded-2xl p-8 shadow-xl text-white"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-center">
            Create a playlist
          </h2>
          <IoMdClose
            className="cursor-pointer hover:scale-105 transition"
            size={24}
            onClick={() => onClose?.()}
          />
        </div>

        <div className="flex flex-col items-center gap-6">
          <h2 className=" text-gray-300 mt-2">Choose Banner</h2>

          <div className="flex flex-col overflow-y-auto snap-y snap-mandatory h-[250px] no-scrollbar">
            {mapImages}
          </div>

          <input
            type="text"
            placeholder="Name"
            className="w-full bg-transparent border-2 border-gray-600 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none"
          />

          <div className="flex gap-4 mt-6 w-full">
            <button className="flex-1 cursor-pointer bg-purple-500 rounded-xl py-3 font-semibold hover:scale-105 transition">
              Add{" "}
            </button>
            <button
              className="flex-1 bg-gray-700 cursor-pointer rounded-2xl py-3 font-semibold hover:scale-105 transition"
              onClick={() => onClose?.()}
            >
              Cancel{" "}
            </button>
          </div>

          {/* <button className="mt-4 px-4 py-2 bg-gray-700 cursor-pointer text-sm rounded-lg text-gray-200 transition">
              Preview Cover </button> */}
        </div>
      </div>
    </div>
  );
}
