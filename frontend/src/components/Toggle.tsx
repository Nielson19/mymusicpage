import { useState } from "react";

export interface ToggleProps {
    isOn?: boolean;
    defaultVal?: boolean;
    onChange?: (value: boolean) => void;
    disabled?: boolean;
}

const Toggle = ({
    isOn,
    defaultVal = false,
    onChange,
    disabled = false,
}: ToggleProps) => {
    const [internalValue, setInternalValue] = useState(defaultVal); // Initialized to act as a control for the toggle
    const isToggled = isOn !== undefined ? isOn : internalValue; // initialized toggle on otherwise false

    const handleToggleState = () => {
        // click handler
        if (disabled) return;
        const newValue = !isToggled;
        if (isOn === undefined) {
            setInternalValue(newValue);
        }
        onChange?.(newValue);
    };

    return (
        <button
            type="button"
            onClick={handleToggleState}
            disabled={disabled}
            className={`
        relative inline-flex h-8 w-13 items-center rounded-full
        transition-colors duration-100 ease-in-out
        ${isToggled ? "bg-yellow-400" : "bg-stone-800"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
        >
            <span
                className={`
          inline-block h-6 w-6 transform rounded-full
          transition-transform duration-200 ease-in-out
          ${isToggled ? "bg-purple-600 translate-x-6" : "bg-purple-600 translate-x-1"}
        `}
            />
        </button>
    );
};

export default Toggle;