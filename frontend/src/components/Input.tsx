type InputProps = {
    size: "SMALL" | "MEDIUM" | "LARGE"
    label?: string
    color: "PRIMARY" | "SECONDARY"
    icon?: React.ReactNode
    type: "password" | "email" | "text" | "number"
    placeholder?: string
  }

export default function Input({size, label, color, icon, type, placeholder} : InputProps) {
    
    return (
        <form>
            {label && (<label>{label}</label>)}
            <input placeholder={placeholder} type={type} />
            {icon && <button type="button">{icon}</button>}
        </form>
    )
}