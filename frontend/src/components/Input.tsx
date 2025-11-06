import React from "react"

type InputProps = {
  size?: "SMALL" | "MEDIUM" | "LARGE"
  label?: string
  color?: {
    PRIMARY: string
  }
  icon?: React.ReactNode
  type?: "password" | "email" | "text" | "number"
  placeholder?: string
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,

}

export default function Input({
  size = "MEDIUM",
  label,
  color = { PRIMARY: "#1E1E1E" },
  icon,
  type = "text",
  placeholder,
  value,
  onChange,
}: InputProps) {

  const sizeClasses = {
    SMALL: "px-3 py-2 text-sm",
    MEDIUM: "px-4 py-2 text-base",
    LARGE: "px-5 py-3 text-lg",
  }[size]

  return (
    <form className="flex align-center flex-col w-fit">
      {label && (
       <label className="block mb-2 text-sm font-medium text-gray-300">
       {label}
     </label>
     
      )}

      <div
        className={`flex items-center rounded-2xl border-gray-800 shadow-sm border transition ${sizeClasses}`}
        style={{
          backgroundColor: color.PRIMARY,
          width: "240px",
        }}
      >
        <input
  type={type}
  placeholder={placeholder}
  value={value}
  onChange={onChange}
  className="bg-transparent outline-none text-gray-200 placeholder-gray-400 flex-1"
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


  