/**
 * A reusable input component for forms, designed with accessibility and styling in mind.
 *
 * @param id - The unique identifier for the input element, used to associate the label with the input.
 * @param name - The name attribute for the input element, typically used for form data submission.
 * @param type - The type of the input element (e.g., "text", "password", "email").
 * @param required - A boolean indicating whether the input field is mandatory.
 * @param autoComplete - The autocomplete attribute for the input, providing hints for browser autofill.
 * @param label - The label text to display for the input field.
 */
interface InputComponentProps {
  id: string;
  name: string;
  type: string;
  required: boolean;
  autoComplete: string;
  label: string;
}

function InputComponent({
  id,
  name,
  type,
  required,
  autoComplete,
  label,
}: InputComponentProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="block text-sm/6 font-medium text-gray-100"
        >
          {label}
        </label>
        {type === "password" && (
          <div className="text-sm">
            <a
              href="#"
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Forgot password?
            </a>
          </div>
        )}
      </div>
      <div className="mt-2">
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
        />
      </div>
    </div>
  );
}

export default InputComponent;
