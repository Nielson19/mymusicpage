type InputProps = {
    size: "SMALL" | "MEDIUM" | "LARGE"
    label?: string
    color: {
      PRIMARY: string
    }
    icon?: React.ReactNode
    type: "password" | "email" | "text" | "number"
    placeholder?: string
  }
  
  export default function Input({ size, label, color, icon, type, placeholder }: InputProps) {
    return (
      <form>
        {label && <label className="block mb-2">{label}</label>}
  
        <div className="relative">
          <input
            style={{ backgroundColor: color.PRIMARY }} 
            className="bg-stone-800 border rounded-2xl pt-2 pb-2 pl-5 pr-10 outline-none"
            placeholder={placeholder}
            type={type}
          />
  
          {icon && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </button>
          )}
        </div>
      </form>
    )
  }
  