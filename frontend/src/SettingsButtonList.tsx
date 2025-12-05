import { IoSettingsOutline } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function SettingsButtonList() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  // Attach outside click listener only when dropdown is open
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const settingButtonHandler = (setting: string) => {
    console.log(`Clicked on setting: ${setting}`);
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative flex flex-col justify-end items-end rounded-2xl">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="p-1 flex items-center bg-transparent justify-center hover:bg-gray-100 rounded-2xl transition-colors transition-duration-500"
        type="button"
        onClick={() => settingButtonHandler("settings")}
      >
        <IoSettingsOutline className="w-5 h-5" />
      </button>

      {/* <!-- Dropdown menu --> */}
      <div
        id="dropdown"
        className={`z-50 ${
          isOpen ? "" : "hidden"
        } bg-neutral-primary-medium border bg-white border-gray-300 rounded-2xl rounded-base shadow-lg w-44 fixed top-[70px] right-[20px]`}
        ref={dropdownRef}
      >
        <ul
          className="overflow p-2 text-sm text-body font-medium hover:bg-gray-100 overflow-hidden rounded-2xl transition-all duration-300"
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
            <a
              href="#"
              className="inline-flex items-center text-red-500 w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
              onClick={() => navigate("/")} // TODO: already routed to login but find a way to clear data for fresh login
            >
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SettingsButtonList;
