import React from "react";

interface AuthButtonProps {
  label: String;
  icon: String;
  size: "SMALL" | "MEDIUM" | "LARGE";
  link: String;
  color?: String;
  hoverColor?: String;
}

function AuthButtonComp(props: AuthButtonProps) {
  return (
    <button
      className={`flex items-center justify-center gap-4 
    ${props.size === "SMALL" ? "px-3 py-1 text-sm" : ""} 
    ${props.size === "MEDIUM" ? "px-4 py-2 text-base" : ""} 
    ${props.size === "LARGE" ? "px-6 py-4 text-lg" : ""} 
    bg-green-500 border-white text-white font-semibold rounded-full text-md cursor-pointer`}
    >
      <img
        src={props.icon as string}
        alt="icon"
        className={`${props.size === "SMALL" ? "w-9 h-9" : ""} 
        ${props.size === "MEDIUM" ? "w-11 h-11" : ""} 
        ${props.size === "LARGE" ? "w-10 h-10" : ""}`}
      />
      <span>{props.label}</span>
    </button>
  );
}

export default AuthButtonComp;
