import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import lottie from "lottie-web";
import Button from "../Button";
import astronautDog from "../../assets/lottie/astronautDog.json"; // might change the animation.

const DashboardEmptyState = ({ Username }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      name: "astronautDog",
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: astronautDog,
      rendererSettings: {
        className: "pointer-events-none", // to prevent click event on the svg/path.
      },
    });
  }, []);

  return (
    <div className="text-center mx-auto absolute inset-0 flex flex-col justify-center items-center">
      {/* <div ref={containerRef} className="h-60 w-60" /> */}
      <img src="/assets/imgs/utils/newuser.png" className="h-40 mb-5" alt="" />
      <h2 className="text-xl font-medium">
        Welcome {Username}, <br /> You must be new here
      </h2>
      <p className="text-lg mb-5">Press the button below to get started!</p>

      <Link to="/addlanguage" className="w-3/5 mx-auto">
        <Button variant="general" textColor="text-white">
          Add a new language!
        </Button>
      </Link>
    </div>
  );
};

export default DashboardEmptyState;
