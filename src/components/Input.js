import { useEffect, useState } from "react";

const iconDecider = (type) => {
  switch (type) {
    case "email":
      return (
        <svg
          className="flex-none stroke-current mr-2 w-6 h-6"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.0004 20.9995C18.7618 20.9995 21.0004 18.7609 21.0004 15.9995C21.0004 13.2381 18.7618 10.9995 16.0004 10.9995C13.2389 10.9995 11.0004 13.2381 11.0004 15.9995C11.0004 18.7609 13.2389 20.9995 16.0004 20.9995Z"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22.6355 25.9995C20.4077 27.4781 17.7499 28.1703 15.0839 27.9663C12.4179 27.7624 9.8963 26.6739 7.91931 24.8737C5.94232 23.0735 4.62313 20.6646 4.17107 18.0293C3.71901 15.394 4.15997 12.6831 5.42398 10.327C6.68799 7.97079 8.70265 6.10422 11.1483 5.02341C13.5939 3.94261 16.3305 3.70948 18.9237 4.36103C21.5169 5.01257 23.8183 6.51147 25.4626 8.61988C27.107 10.7283 28.0001 13.3255 28.0003 15.9993C28.0003 18.7607 27.0003 20.9993 24.5003 20.9993C22.0003 20.9993 21.0003 18.7607 21.0003 15.9993V10.9993"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "password":
      return (
        <svg
          className="flex-none stroke-current mr-2 w-6 h-6"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.646 15.3541C10.8751 13.4313 10.7918 11.3013 11.4101 9.32418C12.0284 7.34704 13.3103 5.64401 15.0393 4.50295C16.7683 3.3619 18.8382 2.85281 20.8992 3.06173C22.9602 3.27066 24.8858 4.18479 26.3507 5.6496C27.8155 7.11442 28.7296 9.04007 28.9385 11.1011C29.1474 13.1621 28.6383 15.232 27.4973 16.961C26.3562 18.6899 24.6532 19.9719 22.676 20.5902C20.6989 21.2084 18.5689 21.1251 16.6461 20.3542L16.6462 20.354L15.0002 22H12.0002V25H9.00024V28H4.00024V23L11.6462 15.354L11.646 15.3541Z"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            opacity="0.5"
            d="M22.5 10C22.7761 10 23 9.77614 23 9.5C23 9.22386 22.7761 9 22.5 9C22.2239 9 22 9.22386 22 9.5C22 9.77614 22.2239 10 22.5 10Z"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22.5 11C23.3284 11 24 10.3284 24 9.5C24 8.67157 23.3284 8 22.5 8C21.6716 8 21 8.67157 21 9.5C21 10.3284 21.6716 11 22.5 11Z"
            fill="black"
          />
        </svg>
      );
    case "search":
      return (
        <svg
          className="flex-none stroke-current mr-2 w-6 h-6"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.5 25C20.299 25 25 20.299 25 14.5C25 8.70101 20.299 4 14.5 4C8.70101 4 4 8.70101 4 14.5C4 20.299 8.70101 25 14.5 25Z"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21.9242 21.925L27.9993 28.0001"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "name":
      return (
        <svg
          className="flex-none stroke-current mr-2 w-6 h-6"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
            stroke="black"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <path
            d="M16 20C18.7614 20 21 17.7614 21 15C21 12.2386 18.7614 10 16 10C13.2386 10 11 12.2386 11 15C11 17.7614 13.2386 20 16 20Z"
            stroke="black"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <path
            d="M7.97485 24.9218C8.72812 23.4408 9.8765 22.1971 11.2929 21.3284C12.7093 20.4598 14.3384 20 16 20C17.6615 20 19.2906 20.4598 20.707 21.3284C22.1234 22.1971 23.2718 23.4407 24.0251 24.9217"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    default:
      break;
  }
};
const Input = ({
  inputName,
  value,
  onChangeValue,
  type,
  placeholder,
  innerRef,
}) => {
  // States
  const [inputIcon, setInputIcon] = useState("");
  useEffect(() => {
    setInputIcon(iconDecider(type));
  }, [type]);

  // Should display clear button & Capitalize placeholder text
  const displayClearBtn = value.length > 0;
  const capitalizedPlaceholder =
    (placeholder || type).charAt(0).toUpperCase() +
    (placeholder || type).slice(1);

  return (
    <div className="defaultBG w-full my-3 lg:mx-auto">
      {inputIcon}
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
          <svg
            className="pointer-events-none stroke-current w-6 h-6"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
              stroke="black"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
            <path
              d="M20 12L12 20"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 20L12 12"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
export default Input;
