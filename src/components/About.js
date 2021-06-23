import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="text-center">
      <Link
        to="/profile"
        className="fixed top-9 left-9 z-50 hover:text-generalOrange-base global-transition"
      >
        <svg
          className="stroke-current w-8 h-8 pointer-events-none"
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
            d="M15.2426 20.2426L11 16L15.2426 11.7574"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11 16H21"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
      <div className="fixed h-screen w-screen inset-0 flex flex-col items-center justify-center">
        <svg
          className="stroke-current w-24 pointer-events-none"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M32 8L62 24L32 39L2 24L32 8Z" fill="#B3EA3E" />
          <path
            d="M2 24L32 8L62 24L32 40L2 24Z"
            stroke="#1F422E"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M47 60V32L32 24"
            stroke="#1F422E"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M55 27.7333V41.3635C55.0008 41.7949 54.8614 42.2149 54.6026 42.5602C52.9185 44.8013 45.8132 52.9999 32 52.9999C18.1868 52.9999 11.0815 44.8013 9.39738 42.5602C9.13865 42.2149 8.99918 41.7949 9 41.3635V27.7333"
            stroke="#1F422E"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h1 className="font-medium text-2xl">LangDesh</h1>
        <h3>Learn The Swadesh List</h3>
        <p className="text-sm font-light mt-1">version 0.1.0</p>
        <hr className="my-2 bg-[#BCBCBC] opacity-40 w-1/5 lg:w-2/12 2xl:w-1/12" />
        <p className="font-light">
          Created by{" "}
          <a
            href="https://github.com/ohadosnat"
            className="font-normal text-general-base hover:text-generalOrange-base global-transition"
          >
            Ohad Osnat
          </a>
        </p>
        <p className="font-light my-2">
          Icons by{" "}
          <a
            href="https://phosphoricons.com/"
            className="font-normal text-general-base hover:text-generalOrange-base global-transition"
          >
            Phosphor
          </a>
        </p>
        <p className="font-light">
          Images by{" "}
          <a
            href="https://blush.design/collections/L9oIBvB7R7IjzZWxOfIu/open-doodles"
            className="font-normal text-general-base hover:text-generalOrange-base global-transition"
          >
            Pablo Stanley
          </a>
        </p>
        <p className="font-light my-2">
          Animations by{" "}
          <a
            href="https://lottiefiles.com/IsionIndustries"
            className="font-normal text-general-base hover:text-generalOrange-base global-transition"
          >
            Ision Industries
          </a>
        </p>
        <p className="font-light mt-4">
          <span className="font-medium">Powered By:</span>
          <br />
          <a
            href="https://reactjs.org/"
            className=" text-general-base hover:text-generalOrange-base global-transition"
          >
            React
          </a>
          ,{" "}
          <a
            href="https://airbnb.design/lottie/"
            className=" text-general-base hover:text-generalOrange-base global-transition"
          >
            Lottie
          </a>
          ,{" "}
          <a
            href="https://tailwindcss.com/"
            className=" text-general-base hover:text-generalOrange-base global-transition"
          >
            TailwindCSS
          </a>{" "}
          <br />
          <a
            href="https://firebase.google.com/"
            className=" text-general-base hover:text-generalOrange-base global-transition"
          >
            Firebase & Firesotre
          </a>
        </p>
      </div>
    </div>
  );
};

export default About;
