/**
 * A reusable button component with customizable size, label, and click handler.
 *
 * @param {Object} props - The properties for the ButtonComponent.
 * @param {() => void} [props.onClick] - Optional click event handler for the button.
 * @param {string} [props.label] - Optional label text to display on the button. Defaults to "Click me".
 * @param {"small" | "medium" | "large"} [props.size] - Optional size of the button.
 *        Determines the padding applied to the button.
 *        Accepts "small", "medium", or "large".
 */
import { BUTTON_VARIANTS } from "../constants/colors";

// Define the props for the ButtonComponent

interface ButtonComponentProps {
  onClick?: () => void;
  label?: string;
  size?: "small" | "medium" | "large";
}

const ButtonComponent = ({ onClick, label, size }: ButtonComponentProps) => {
  let sizeVal = "";

  // Determine padding based on size prop
  if (size === "small") {
    sizeVal = "";
    // Apply small button styles
    sizeVal = "py-2 px-8";
  } else if (size === "medium") {
    // Apply medium button styles
    sizeVal = "py-2 px-20";
  } else if (size === "large") {
    // Apply large button styles
    sizeVal = "py-3 px-40";
  }
  return (
    <div className="bg-white flex flex-col justify-center items-center h-screen gap-4">
      <button
        className={`bg-primary-500
            shadow-md 
            shadow-black/20 
            text-lg font-bold 
            ${sizeVal} 
            rounded-full 
            transition duration-300`}
        onClick={onClick}
      >
        {label || "Click me"}
      </button>
    </div>
  );
};

export default ButtonComponent;
