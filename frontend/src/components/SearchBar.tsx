import { LuSearch } from "react-icons/lu";
import { IoMicOutline } from "react-icons/io5";
import { VscSettings } from "react-icons/vsc";

export default function SearchBar() {
  return (
    <form
      className="flex items-center bg-[#1E1E1E] rounded-2xl px-3 py-2 w-[320px] shadow-sm border border-transparent transition focus-within:border-purple-500">
      <button type="submit" className="text-gray-400 hover:text-white cursor-pointer">
        <LuSearch size={25} />
      </button>

      <input
        type="text"
        placeholder="Search ..."
        className="bg-transparent outline-none text-gray-200 placeholder-gray-500 flex-1 px-2"/>

      <button type="button" className="text-gray-400 hover:text-white mx-1 cursor-pointer">
        <IoMicOutline size={25} />
      </button>

      <button
        type="button"
        className="text-purple-500 hover:text-purple-600 bg-[#1E1E1E] rounded-xl p-2 cursor-pointer">
        <VscSettings size={25} />
      </button>
    </form>
  );
}
