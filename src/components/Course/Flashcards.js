import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory, useLocation, Prompt } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useLangs } from "../../contexts/LangsContext";
import filterWords from "../../utils/sessionFuncs";
import "../Dashboard/animations.css";
import lottie from "lottie-web";
import Button from "../Button";
import WordCard from "../WordCard";
import getRandomLoader from "../../utils/randomLoader";
import confetti from "../../../assets/lottie/confetti.json";

const Flashcards = () => {
  // custom hooks
  const { updateWords } = useLangs();
  const history = useHistory();
  const { currentUserDoc } = useAuth();
  const { state } = useLocation();
  const { courseID, langID, wordsData } = state;

  // init quiz states
  const [isLoading, setIsLoading] = useState(true);
  const [toAnimate, setToAnimate] = useState(true);
  const loadingRef = useRef(null);
  const [loader, setLoader] = useState({});

  // end of session animation ref
  const conffetiRef = useRef(null);

  const [challenges, setChallenges] = useState([]);
  const [displayChallenges, setDisplayChallenges] = useState(false);

  const [score, setScore] = useState({
    hard: [],
    okay: [],
    easy: [],
  });

  const [{ currentChallenge, isCardFlipped, showScore }, setSession] = useState(
    {
      currentChallenge: 0,
      isCardFlipped: false,
      showScore: false,
    }
  );

  useEffect(() => {
    if (Object.entries(currentUserDoc).length === 0) return; // making sure currentUserDoc loads.
    setChallenges(filterWords(wordsData, currentUserDoc, langID, courseID));
    setDisplayChallenges(true);
  }, [currentUserDoc]);

  useState(() => {
    setLoader(getRandomLoader());
  }, []);

  // Loading Animation
  useEffect(() => {
    lottie.loadAnimation({
      name: "loader",
      container: loadingRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: loader,
      rendererSettings: {
        className: "pointer-events-none", // to prevent click event on the svg/path.
      },
    });
    setTimeout(() => {
      setToAnimate(false);
    }, 2500);
    setTimeout(() => {
      setIsLoading(false);
      lottie.destroy("loader");
    }, 3000);
  }, [loader]);

  const startLoadingAnimation = { animation: "startLoading 500ms ease-in-out" };
  const endLoadingAnimation = { animation: " endLoading 500ms ease-in-out" };

  useEffect(() => {
    if (showScore) {
      console.log("hello");
      lottie.loadAnimation({
        name: "confetti",
        container: conffetiRef.current,
        renderer: "svg",
        loop: false,
        autoplay: false,
        animationData: confetti,
        rendererSettings: {
          className: "pointer-events-none", // to prevent click event on the svg/path.
        },
      });
      lottie.play("confetti");
    } else {
      return;
    }
  }, [showScore]);

  const cardFlipHandle = () => {
    setSession((data) => ({
      ...data,
      isCardFlipped: true,
    }));
  };

  const optionHandle = (e) => {
    if (e.target.innerText === "Hard") {
      setScore((data) => ({
        ...data,
        hard: [...score.hard, challenges[currentChallenge].id],
      }));

      if (currentChallenge + 1 === challenges.length)
        return setSession((data) => ({ ...data, showScore: true }));
      setSession((data) => ({
        ...data,
        currentChallenge: currentChallenge + 1,
        isCardFlipped: false,
      }));
    }
    if (e.target.innerText === "Okay") {
      setScore((data) => ({
        ...data,
        okay: [...score.okay, challenges[currentChallenge].id],
      }));

      if (currentChallenge + 1 === challenges.length)
        return setSession((data) => ({ ...data, showScore: true }));
      setSession((data) => ({
        ...data,
        currentChallenge: currentChallenge + 1,
        isCardFlipped: false,
      }));
    }
    if (e.target.innerText === "Easy") {
      setScore((data) => ({
        ...data,
        easy: [...score.easy, challenges[currentChallenge].id],
      }));

      if (currentChallenge + 1 === challenges.length)
        return setSession((data) => ({ ...data, showScore: true }));
      setSession((data) => ({
        ...data,
        currentChallenge: currentChallenge + 1,
        isCardFlipped: false,
      }));
    }
  };

  // End Session
  const endSessionHandle = async () => {
    try {
      await updateWords(score, currentUserDoc, courseID, langID);
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Prompt
        when={currentChallenge < 9}
        message="You haven't finished the session, are you sure you want to leave?"
      />
      {isLoading ? (
        <div
          style={toAnimate ? startLoadingAnimation : endLoadingAnimation}
          className="bg-white flex flex-col justify-center text-center mx-auto fixed inset-0 h-full z-50"
        >
          <div>
            <div ref={loadingRef} className="mx-auto w-60 -mb-10" />
            <p className="font-medium text-xl">Get Ready!</p>
          </div>
        </div>
      ) : (
        <div className="relative h-screen font-medium flex flex-col items-center lg:mx-auto lg:w-3/5 2xl:w-2/5">
          {showScore ? (
            // Showing Score (end of session)
            <div
              className="w-4/5 flex mb-8 flex-col justify-between items-center h-full"
              style={{
                animation: `${showScore && "startLoading 500ms ease-in"}`,
              }}
            >
              <div className="fixed inset-0 flex flex-col flex-grow items-center justify-center content-center">
                <h2 className="font-medium text-3xl w-full mb-6 text-center">
                  {score.easy.length > score.hard.length ||
                  score.easy.length > score.okay.length
                    ? "Nice Work!"
                    : "You'll get em next time"}
                </h2>
                <div>
                  <div className="flex items-center justify-center space-x-3">
                    <p className="font-normal flex flex-col justify-center items-center">
                      <span className="text-2xl font-medium text-wrong-base">
                        {score.hard.length}
                      </span>
                      HARD
                    </p>
                    <p className="font-normal flex flex-col justify-center items-center">
                      <span className="text-2xl font-medium text-correct-base">
                        {score.easy.length}
                      </span>
                      EASY
                    </p>
                    <p className="font-normal flex flex-col justify-center items-center">
                      <span className="text-2xl font-medium text-generalOrange-base">
                        {score.okay.length}
                      </span>
                      OKAY
                    </p>
                  </div>
                  <div className="flex space-x-1">
                    <hr
                      className="h-1 mt-2 rounded-full bg-wrong-base"
                      style={{
                        flexGrow: `${
                          score.hard.length === 0 ? 0.2 : score.hard.length
                        }`,
                      }}
                    />
                    <hr
                      className="h-1 mt-2 rounded-full bg-correct-base"
                      style={{
                        flexGrow: `${
                          score.easy.length === 0 ? 0.2 : score.easy.length
                        }`,
                      }}
                    />
                    <hr
                      className="h-1 mt-2 rounded-full bg-generalOrange-base"
                      style={{
                        flexGrow: `${
                          score.okay.length === 0 ? 0.2 : score.okay.length
                        }`,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="fixed bottom-8 w-4/5 lg:w-2/5 2xl:w-1/5">
                <Button
                  type="submit"
                  variant="general"
                  textColor="text-white"
                  onClickHandle={endSessionHandle}
                >
                  Continue
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="z-10 mt-5 flex w-11/12 items-center">
                <Link to="/">
                  <svg
                    className="stroke-current w-8 h-8 pointer-events-none mr-2"
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
                      d="M12.4645 19.5355L19.5355 12.4645"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.4645 12.4645L19.5355 19.5355"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <div className="flex-grow-0 bg-disabled h-2 w-full  rounded-full overflow-hidden">
                  <div
                    className="bg-general-base h-full rounded-full global-transition"
                    style={{ width: `${currentChallenge}0%` }}
                  />
                </div>
              </div>
              <div className="fixed inset-0 flex flex-col justify-center items-center h-full flex-grow">
                {displayChallenges &&
                  [challenges[currentChallenge]].map((word) => (
                    <WordCard
                      key={word.id}
                      wordData={word}
                      langID={langID}
                      isQuiz={true}
                      isCardFlipped={isCardFlipped} // to add this to card.
                    />
                  ))}
              </div>
              <div className="fixed bottom-9 w-4/5 lg:w-2/5 2xl:w-1/5">
                {isCardFlipped ? (
                  <div className="flex items-center  space-x-5">
                    <Button
                      variant="wrong"
                      onClickHandle={(e) => optionHandle(e)}
                    >
                      Hard
                    </Button>
                    <Button
                      variant="generalOrange"
                      onClickHandle={(e) => optionHandle(e)}
                    >
                      Okay
                    </Button>
                    <Button
                      variant="correct"
                      onClickHandle={(e) => optionHandle(e)}
                    >
                      Easy
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="general"
                    textColor="text-white"
                    onClickHandle={cardFlipHandle}
                  >
                    Flip Card
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Flashcards;
