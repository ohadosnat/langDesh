import { ChangeEvent } from "react";
import { ClearIcon } from "../assets/icons/Icons";

interface Props {
  inputName?: string;
  value: string;
  onChangeValue: (
    e:
      | ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  type: InputType;
  placeholder?: string;
  innerRef?: React.MutableRefObject<HTMLInputElement | null>;
  startIcon: JSX.Element;
}

/**
 * A general Input Component
 * @param inputName - Name attribute
 * @param value - the input value
 * @param onChangeValue - the value's change handler
 * @param type - type attribute
 * @param placeholder - place holder text
 * @param innerRef - React reference
 * @param startIcon - Input field icon - `JSX.Element`
 */
const Input = ({
  inputName,
  value,
  onChangeValue,
  type,
  placeholder,
  innerRef,
  startIcon,
}: Props) => {
  // States

  // Should display clear button & Capitalize placeholder text
  const displayClearBtn = value.length > 0;
  const capitalizedPlaceholder =
    (placeholder || type).charAt(0).toUpperCase() +
    (placeholder || type).slice(1);

  return (
    <div className="defaultBG w-full my-3 lg:mx-auto">
      {startIcon}
      <input
        value={value}
        onChange={onChangeValue}
        ref={innerRef}
        name={inputName || type}
        type={type === "search" ? "text" : type}
        placeholder={`${capitalizedPlaceholder}...`}
        autoComplete="off"
        className="w-full flex-grow bg-transparent placeholder-black placeholder-opacity-50 focus:outline-none placeholder"
        required
      />

      {/* Clear Button */}
      {displayClearBtn && (
        <button
          type="button"
          id="clearButton"
          onClick={onChangeValue}
          className="flex-none ml-2"
        >
          <ClearIcon className="pointer-events-none stroke-current w-6 h-6" />
        </button>
      )}
    </div>
  );
};
export default Input;
