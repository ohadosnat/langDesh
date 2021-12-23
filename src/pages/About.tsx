import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftCircleIcon, LangDeshIcon } from "../assets/icons/Icons";

const About = () => {
  return (
    <div className="text-center">
      <Link
        to="/profile"
        className="text-black fixed top-9 left-9 z-50 hover:text-generalOrange-base global-transition"
      >
        <ArrowLeftCircleIcon className="stroke-current w-8 h-8 pointer-events-none" />
      </Link>
      <div className="fixed h-screen w-screen inset-0 flex flex-col items-center justify-center">
        <LangDeshIcon
          className="stroke-current w-24 pointer-events-none"
          viewBox="0 0 64 64"
        />
        <h1 className="font-medium text-2xl">LangDesh</h1>
        <h3>Learn The Swadesh List</h3>
        <p className="text-sm font-light mt-1">version 0.2.0</p>
        {/* TODO: Change Version */}
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
        <p className="font-light">
          Audio by{" "}
          <a
            href="http://shtooka.net/"
            className="font-normal text-general-base hover:text-generalOrange-base global-transition"
          >
            Shtooka Project
          </a>
          {", "}
          <a
            href="https://lingualibre.org/wiki/LinguaLibre:Main_Page"
            className="font-normal text-general-base hover:text-generalOrange-base global-transition"
          >
            Lingua Libre
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
