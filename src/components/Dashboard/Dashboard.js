// General Imports: from React, CSS & Other Libraries.
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import lottie from "lottie-web";
import "./animations.css";
// Custom Hooks & Utils
import { useAuth } from "../../contexts/AuthContext";
import { useLangs } from "../../contexts/LangsContext";
import { useForm } from "../../customHooks/useForm";
// Components
import CoursesWrapper from "../Course/CoursesWrapper";
import Input from "../Input";
import DashboardEmptyState from "./DashboardEmptyState";
// Animations
import loadingCube from "../../assets/lottie/loadingCube.json";
import cryingBlob from "../../assets/lottie/cryingBlob.json";
import Menu from "../Menu";

const Dashboard = () => {
  // Custom Hooks
  const { getCoursesData, getActiveLangs, userActiveLangs } = useLangs();
  const { currentUser, currentUserDoc } = useAuth();
  // Loading
  const [toAnimate, setToAnimate] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const loadingRef = useRef(null);
  // Search
  const [values, handleChange] = useForm({ search: "" });
  const noResultsRef = useRef(null);

  // UseEffect for loading.
  useEffect(() => {
    if (!isLoading) return;
    lottie.loadAnimation({
      name: "loadingCube",
      container: loadingRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: loadingCube,
      rendererSettings: {
        className: "pointer-events-none", // to prevent click event on the svg/path.
      },
    });
    getActiveLangs(currentUserDoc);
    getCoursesData();
    // Small Delay for loading animation
    setTimeout(() => {
      setToAnimate(false);
    }, 2500);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [isLoading]);

  // Animation Styling
  const startLoadingAnimation = { animation: "startLoading 500ms ease-in-out" };
  const endLoadingAnimation = { animation: " endLoading 500ms ease-in-out" };

  // Search Langs functions
  const filteredData = userActiveLangs.filter((language) => {
    return language.name.toLowerCase().includes(values.search.toLowerCase());
  });
  const noResults = filteredData.length === 0;

  // useEffect for handling the animation (start/stop)
  useEffect(() => {
    if (!noResults) lottie.stop(cryingBlob);
    lottie.loadAnimation({
      name: "cryingBlob",
      container: noResultsRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: cryingBlob,
      rendererSettings: {
        className: "pointer-events-none", // to prevent click event on the svg/path.
      },
    });
  }, [noResults]);

  return (
    <div className="overflow-x-hidden p-6 pb-20 w-full">
      {isLoading ? (
        <div
          style={toAnimate ? startLoadingAnimation : endLoadingAnimation}
          className="flex flex-col justify-center text-center mx-auto fixed inset-0 h-full"
        >
          <div ref={loadingRef} className="mx-auto w-60 -mb-10" />
          <p className="font-medium text-xl">Loading your data...</p>
        </div>
      ) : userActiveLangs.length === 0 ? (
        <DashboardEmptyState Username={currentUserDoc.name} />
      ) : (
        <>
          <Input
            type="search"
            placeholder="Search Language"
            className="w-11/12 mt-5 mx-auto text-center"
            value={values.search}
            onChangeValue={handleChange}
          />

          {!noResults ? (
            <>
              {filteredData.map((lang) => (
                <CoursesWrapper
                  key={lang.id}
                  lang={lang.id}
                  title={lang.name}
                  flag={lang.flagPath}
                />
              ))}
            </>
          ) : (
            <div className="z-[-1] fixed inset-0 flex flex-col justify-center items-center mx-auto my-8">
              <div className="w-60" ref={noResultsRef} />
              <p className="font-medium text-xl -mt-4">
                Can't find{" "}
                <span className="text-general-base">{values.search}</span>
              </p>
            </div>
          )}
        </>
      )}
      <Menu currentPage="main" />
    </div>
  );
};

export default Dashboard;
