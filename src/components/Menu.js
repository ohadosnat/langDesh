import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Menu = ({ currentPage }) => {
  const { currentUserDoc } = useAuth();

  return (
    <div className="bg-white border-t shadow-sm fixed bottom-0 inset-x-0 py-6 flex items-center justify-evenly lg:absolute lg:w-1/6 lg:right-4 lg:top-11 lg:bottom-auto lg:left-auto lg:border-none lg:shadow-none lg:py-0">
      <Link to="/">
        <svg
          className={`stroke-current w-8 h-8 ${
            currentPage === "main"
              ? "text-general-base"
              : "hover:text-general-dark"
          }`}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 12L16 4L31 12L16 20L1 12Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23.5 30V16L16 12"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M27.5 13.8666V20.6817C27.5004 20.8975 27.4307 21.1075 27.3013 21.2801C26.4592 22.4006 22.9066 26.5 16 26.5C9.09339 26.5 5.54077 22.4006 4.69869 21.2801C4.56932 21.1075 4.49959 20.8975 4.5 20.6817V13.8666"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
      <hr className="h-6 w-[1px] opacity-40 bg-black" />
      {currentUserDoc && currentUserDoc.activeLangs.length < 4 && (
        <>
          <Link to="/addlanguage">
            <svg
              className="stroke-current w-8 h-8 global-transition hover:text-general-dark"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
                strokeWidth="2"
                strokeMiterlimit="10"
              />
              <path
                d="M11 16H21"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 11V21"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <hr className="h-6 w-[1px] opacity-40 bg-black" />
        </>
      )}
      <Link to="/profile">
        <svg
          className={`stroke-current w-8 h-8 ${
            currentPage === "profile"
              ? "text-general-base"
              : "hover:text-general-dark"
          }`}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <path
            d="M16 20C18.7614 20 21 17.7614 21 15C21 12.2386 18.7614 10 16 10C13.2386 10 11 12.2386 11 15C11 17.7614 13.2386 20 16 20Z"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <path
            d="M7.97485 24.9218C8.72812 23.4408 9.8765 22.1971 11.2929 21.3284C12.7093 20.4598 14.3384 20 16 20C17.6615 20 19.2906 20.4598 20.707 21.3284C22.1234 22.1971 23.2718 23.4407 24.0251 24.9217"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
};

export default Menu;
