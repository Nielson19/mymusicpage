import { CiLock } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import Input from "./Input";
import image1 from '/Users/asadchaudhry/Desktop/mymusicpage/frontend/src/assets/images/image1.jpg'
import image2 from "/Users/asadchaudhry/Desktop/mymusicpage/frontend/src/assets/images/image2.jpg"
import image3 from "/Users/asadchaudhry/Desktop/mymusicpage/frontend/src/assets/images/image3.jpg"
import image4 from "/Users/asadchaudhry/Desktop/mymusicpage/frontend/src/assets/images/image4.jpg"
import image5 from "/Users/asadchaudhry/Desktop/mymusicpage/frontend/src/assets/images/image5.jpg"
import { useState } from "react";

export default function CreatePlaylist() {

    const imgs = [image1,image2,image3,image4,image5]


    function imgSelected() {
      console.log("Hello")
    }

    const mapImages = imgs.map((img,i) => (
      <img onClick={imgSelected} key={i} src={img} alt="background" className={`w-full h-[250px] object-cover flex-shrink-0 snap-start rounded-md`} />
    ))



  return (

            <div className="w-full max-w-md bg-black rounded-2xl p-8 shadow-xl text-white">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-center">Create a playlist</h2>
                <IoMdClose className="cursor-pointer hover:scale-105 transition" size={24} />
              </div>



        <div className="flex flex-col items-center gap-6">
          {/* <label className="flex flex-col items-center cursor-pointer"> */}
            {/* <div className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-500 flex items-center justify-center transition">
              <svg
                className="w-8 h-8 text-gray-300 hover:scale-105 transition"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
              <FaPlus className="ml-1 inline-block" size={24} />
              </svg>
            </div> */}
            <h2 className=" text-gray-300 mt-2">Choose Banner</h2>
            {/* <input type="file" className="hidden" /> */}
          {/* </label> */}


            <div className="flex flex-col overflow-y-auto snap-y snap-mandatory h-[250px] no-scrollbar">
            {mapImages}
            </div>



          <input
            type="text"
            placeholder="Name"
            className="w-full bg-transparent border-2 border-gray-600 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none"/>
        
          {/* <textarea
            placeholder="Add description"
            className="w-full bg-transparent border-2 border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none resize-none"></textarea> */}

        {/* <div className="flex items-center justify-between w-full text-gray-300 text-sm">
          <div className="flex items-center gap-2 cursor-pointer">
            <CiLock className="hover:scale-105 transition text-purple-500"size={20}/>
            <span>Private</span>
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <FaPlus className="hover:scale-105 transition" size={20}/>
            <span>Collaborators</span>
          </div>
        </div> */}


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
