import { LuSearch } from "react-icons/lu";
import { IoMicOutline } from "react-icons/io5";
import { VscSettings } from "react-icons/vsc";

export default function SearchBar() {

    return (
      <form>
         <button type="submit">
          <LuSearch size={20} />
        </button>

        <input type="text" placeholder="Search..">
        </input>

        <button type="button">
          <IoMicOutline size={20} />
        </button>

        <button type="button">
          <VscSettings size={20} />
        </button>
      </form>
    )
  }