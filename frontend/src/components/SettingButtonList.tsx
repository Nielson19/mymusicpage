import React from "react";
import { useNavigate } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { useState } from "react"; 

export default function SettingButtonList() {
    const navigate = useNavigate();
    const [openDropDown, setopenDropDown] = useState(false);
    

  const handleLogout = () => {
    navigate("/login");
  };

  const handleOpenDropDown = () => {
    setopenDropDown(!openDropDown);
  }

  return (
    <button className="p-3 border border-black rounded-2xl cursor-pointer"
    >
        <IoSettingsOutline />
    </button>

  );
}

