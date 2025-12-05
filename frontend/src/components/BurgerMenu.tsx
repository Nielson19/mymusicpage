import { useState, useRef, useEffect } from "react";

export interface BurgerMenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  className?: string; // added
}

export interface BurgerMenuProps {
  items: BurgerMenuItem[];
  iconImage?: string | React.ReactNode;
  buttonLabel?: string; // added
  className?: string;
  dropdownClassName?: string;
}

export const BurgerMenu = ({
  items,
  iconImage,
  buttonLabel,
  className,
  dropdownClassName,
}: BurgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`relative inline-block`} ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 bg-stone-800 rounded-lg hover:bg-stone-700 transition-colors ${className}`}
      >
        {iconImage ? (
          typeof iconImage === "string" ? (
            <img src={iconImage} alt="Menu Icon" className="w-5 h-5" />
          ) : (
            <div className="flex items-center gap-2">
              {iconImage}
              {buttonLabel && <span className="text-sm">{buttonLabel}</span>}
            </div>
          )
        ) : (
          <span className="w-5 h-5">☰</span>
        )}
      </button>

      {isOpen && (
        <div
          className={`absolute mt-2 w-48 bg-stone-800 rounded-lg shadow-xl border border-stone-700 overflow-hidden z-50 ${dropdownClassName}`}
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-stone-700 transition-colors text-left ${item.className}`}
            >
              {item.icon && <span className="w-5 h-5">{item.icon}</span>}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
