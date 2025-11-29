import { CiLock } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import Input from "./Input";

export default function CreatePlaylist() {
  return (

            <div className="w-full max-w-md bg-gray-800 rounded-2xl p-8 shadow-xl text-white">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-center">Create a playlist</h2>
                <IoMdClose className="cursor-pointer hover:scale-105 transition" size={24} />
              </div>

        <div className="flex flex-col items-center gap-6">
          <label className="flex flex-col items-center cursor-pointer">
            <div className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-500 flex items-center justify-center transition">
              <svg
                className="w-8 h-8 text-gray-300 hover:scale-105 transition"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
              <FaPlus className="ml-1 inline-block" size={24} />
              </svg>
            </div>
            <span className="text-sm text-gray-300 mt-2">Upload Picture</span>
            <input type="file" className="hidden" />
          </label>

          <input
            type="text"
            placeholder="Name"
            className="w-full bg-transparent border-2 border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none"/>
        
          <textarea
            placeholder="Add description"
            className="w-full bg-transparent border-2 border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none resize-none"></textarea>

        <div className="flex items-center justify-between w-full text-gray-300 text-sm">
          <div className="flex items-center gap-2 cursor-pointer">
            <CiLock className="hover:scale-105 transition text-purple-500"size={20}/>
            <span>Private</span>
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <FaPlus className="hover:scale-105 transition" size={20}/>
            <span>Collaborators</span>
          </div>
        </div>


          <div className="flex gap-4 mt-6 w-full">
            <button className="flex-1 cursor-pointer bg-purple-500 rounded-xl py-3 font-semibold hover:scale-105 transition">
              Add </button>
            <button className="flex-1 bg-gray-700 cursor-pointer rounded-xl py-3 font-semibold hover:scale-105 transition">
              Cancel </button>
          </div>

          {/* <button className="mt-4 px-4 py-2 bg-gray-700 cursor-pointer text-sm rounded-lg text-gray-200 transition">
            Preview Cover </button> */}
        </div>
      </div>
  );
}
