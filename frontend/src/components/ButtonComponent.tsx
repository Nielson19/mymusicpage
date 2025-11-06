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
    sizeVal = "py-2 px-1";
  } else if (size === "medium") {
    // Apply medium button styles
    sizeVal = "py-2 px-10";
  } else if (size === "large") {
    // Apply large button styles
    sizeVal = "py-2 px-30";
  }
  return (
    <div>
      <button
        className={`bg-secondary-500 text-white hover:bg-secondary-800 focus:ring-2 focus:ring-primary-300
            shadow-md 
            shadow-black/20 
            text-lg font-bold 
            ${sizeVal} 
            rounded-lg 
            transition duration-300`}
          onClick={onClick}>
        {label || "Click me"}
      </button>
    </div>
  );
};

export default ButtonComponent;
