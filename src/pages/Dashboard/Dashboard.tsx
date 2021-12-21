// General Imports: from React, CSS & Other Libraries.
import { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import "./animations.css";
// Custom Hooks & Utils
import { useAuth } from "../../contexts/AuthContext";
import { useLangs } from "../../contexts/LangsContext";
import { useForm } from "../../customHooks/useForm";
// Components
import CoursesWrapper from "../Course/CoursesWrapper";
import Input from "../../components/Input";
import DashboardEmptyState from "./DashboardEmptyState";
// Animations
import cryingBlob from "../../assets/lottie/cryingBlob.json";
import Menu from "../../components/Menu";
import getRandomLoader from "../../utils/randomLoader";
import { SearchIcon } from "../../assets/icons/Icons";

// Animation Styling
const startLoadingAnimation = { animation: "startLoading 500ms ease-in-out" };
const endLoadingAnimation = { animation: " endLoading 500ms ease-in-out" };

const Dashboard = () => {
  // Custom Hooks
  const { userActiveLangs, getCoursesData, getActiveLangs } = useLangs();
  const { currentUserDoc } = useAuth();

  // Search
  const [values, handleChange] = useForm({ search: "" });
  const noResultsRef = useRef<HTMLDivElement>(null);

  // Loading
  const loadingRef = useRef<HTMLDivElement>(null);
  const [toAnimate, setToAnimate] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Search Langs functions
  const filteredData = userActiveLangs.filter(({ name }) => {
    return name.toLowerCase().includes(values.search.toLowerCase());
  });
  const noResults = filteredData.length === 0;

  useEffect(() => {
    lottie.loadAnimation({
      name: "loader",
      container: loadingRef.current!,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: getRandomLoader(),
      rendererSettings: {
        className: "pointer-events-none", // to prevent click event on the svg/path.
      },
    });

    getActiveLangs(currentUserDoc!.activeLangs);
    getCoursesData().then(() => {
      // Small Delay for loading animation
      const animateTimer = setTimeout(() => {
        setToAnimate(false);
      }, 2500);
      const loadingTimer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      return () => {
        clearTimeout(animateTimer);
        clearTimeout(loadingTimer);
      };
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect for handling the animation (start/stop)
  useEffect(() => {
    if (!noResults) lottie.stop("cryingBlob");

    lottie.loadAnimation({
      name: "cryingBlob",
      container: noResultsRef.current!,
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
      ) : !userActiveLangs.length ? (
        <DashboardEmptyState username={currentUserDoc!.name} />
      ) : (
        <>
          <div className="lg:w-3/5 lg:mx-auto 2xl:w-2/5">
            <Input
              type="search"
              placeholder="Search Language"
              value={values.search}
              onChangeValue={handleChange}
              startIcon={
                <SearchIcon className="flex-none stroke-current mr-2 w-6 h-6" />
              }
            />
          </div>

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
