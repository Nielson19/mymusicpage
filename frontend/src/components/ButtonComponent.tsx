/**
 * A reusable button component with customizable size, label, and click handler.
 *
 * @param {Object} props - The properties for the ButtonComponent.
 * @param {() => void} [props.onClick] - Optional click event handler for the button.
 * @param {string} [props.label] - Optional label text to display on the button. Defaults to "Click me".
 * @param {"small" | "medium" | "large"} [props.size] - Optional size of the button.
 *        Determines the padding applied to the button.
 *        Accepts "small", "medium", or "large".npm
 */

// Define the props for the ButtonComponent

interface ButtonComponentProps {
  onClick?: () => void;
  label?: string;
  size?: "small" | "medium" | "large" | "full";
  type?: "button" | "submit" | "reset";
  className?: string;
}

const ButtonComponent = ({
  onClick,
  label,
  size,
  type = "button",
}: ButtonComponentProps) => {
  let sizeVal = "";

  // Determine padding based on size prop
  if (size === "small") {
    sizeVal = "";
    // Apply small button styles
    sizeVal = "py-2 px-1";
  } else if (size === "medium") {
    // Apply medium button styles
    sizeVal = "py-2 px-10";
  } else if (size === "large") {
    // Apply large button styles
    sizeVal = "py-2 px-30";
  } else if (size === "full") {
    // Apply full width button styles
    sizeVal = "w-full py-3 px-0";
  }

  return (
    <div>
      <button
        type={type}
        className={`bg-[#7C4DFF] hover:bg-[#6E42E6] text-white font-semibold 
                    rounded-full shadow-md transition duration-300 
                    focus:outline-none focus:ring-2 focus:ring-[#9C72FF] ${sizeVal}`}
        onClick={onClick}
      >
        {label || "Click me"}
      </button>
    </div>
  );
};

export default ButtonComponent;
