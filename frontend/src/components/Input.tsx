import React from "react"

type InputProps = {
  size?: "SMALL" | "MEDIUM" | "LARGE"
  label?: string
  color?: {
    PRIMARY: string
  }
  icon?: React.ReactNode
  type?: "password" | "email" | "text" | "number" | "tel"
  placeholder?: string
}

export default function Input({size = "MEDIUM", label, color = { PRIMARY: "#1E1E1E" }, icon, type = "text", placeholder}: InputProps) {

  const sizeClasses = {
    SMALL: "px-3 py-2 text-sm",
    MEDIUM: "px-4 py-2 text-base",
    LARGE: "px-5 py-3 text-lg",
  }[size]

  return (
    <form className="flex flex-col w-fit">
      {label && (
        <label className="block mb-2 text-sm font-medium text-stone-800">
          {label}
        </label>
      )}

      <div
        className={`flex items-center rounded-2xl shadow-sm border border-transparent transition ${sizeClasses}`}
        style={{
          backgroundColor: color.PRIMARY,
          width: "240px",
        }}
      >
        <input
          type={type}
          placeholder={placeholder}
          className="bg-transparent outline-none text-gray-100 placeholder-gray-300 flex-1"
        />

        {icon && (
          <button
            type="button"
            className="text-gray-300 hover:text-white cursor-pointer"
          >
            {icon}
          </button>
        )}
      </div>
    </form>
  )
}


  