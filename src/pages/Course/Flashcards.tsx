import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import filterWords, { endSessionHandle } from "../../utils/sessionFuncs";
import "../Dashboard/animations.css";
import lottie from "lottie-web";
import Button from "../../components/Button";
import WordCard from "../../components/WordCard";
import getRandomLoader from "../../utils/randomLoader";
import confetti from "../../assets/lottie/confetti.json";
import { CircleExitIcon } from "../../assets/icons/Icons";

type FlashcardsOptions = "Hard" | "Okay" | "Easy";

const startLoadingAnimation = { animation: "startLoading 500ms ease-in-out" };
const endLoadingAnimation = { animation: " endLoading 500ms ease-in-out" };

const Flashcards = () => {
  // Custom Hooks
  const navigate = useNavigate();
  const { currentUserDoc } = useAuth();
  const { state } = useLocation();
  const { courseID, langID, wordsData } = state as SessionLocationState;

  // Loading/Animation States
  const [isLoading, setIsLoading] = useState(true);
  const [toAnimate, setToAnimate] = useState(true);
  const loadingRef = useRef<HTMLDivElement>(null);
  const [loader] = useState<Loader>(getRandomLoader());

  // end of session animation ref
  const conffetiRef = useRef<HTMLDivElement>(null);

  // Sessions States - Display Challenges, Challenges, Score, Current Challenge States
  const [displayChallenges, setDisplayChallenges] = useState<boolean>(false);
  const [challenges, setChallenges] = useState<ChallengeWord[]>([]);
  const [score, setScore] = useState<FlashcardsScore>({
    correct: [],
    wrong: [],
    okay: [],
  });
  const [{ currentChallenge, isCardFlipped, showScore }, setSession] =
    useState<CurrentSession>({
      currentChallenge: 0,
      isCardFlipped: false,
      showScore: false,
    });

  // Set challenges
  useEffect(() => {
    if (!currentUserDoc) return; // making sure currentUserDoc loads.
    setChallenges(filterWords(wordsData, currentUserDoc, langID, courseID));
    setDisplayChallenges(true);
  }, [courseID, currentUserDoc, langID, wordsData]);

  // Loading Animation
  useEffect(() => {
    if (!loadingRef.current || !loader) return;

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

    setTimeout(() => setToAnimate(false), 2500);
    setTimeout(() => {
      setIsLoading(false);
      lottie.destroy("loader");
    }, 3000);
  }, [loader]);

  useEffect(() => {
    if (!showScore || !conffetiRef.current) return;

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
  }, [showScore]);

  const cardFlipHandle = () => {
    setSession((state) => ({
      ...state,
      isCardFlipped: true,
    }));
  };

  const optionHandle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const optionValue = e.currentTarget.textContent as FlashcardsOptions;

    if (optionValue === "Hard") {
      setScore((state) => ({
        ...state,
        wrong: [...state.wrong, challenges[currentChallenge].id],
      }));
    }
    if (optionValue === "Okay") {
      setScore((state) => ({
        ...state,
        okay: [...state.okay, challenges[currentChallenge].id],
      }));
    }

    if (optionValue === "Easy") {
      setScore((state) => ({
        ...state,
        correct: [...state.correct, challenges[currentChallenge].id],
      }));
    }

    // show score if it's the last challenge ELSE go to the next challenge
    if (currentChallenge + 1 === challenges.length) {
      setSession((state) => ({ ...state, showScore: true }));
    } else {
      setSession((state) => ({
        ...state,
        currentChallenge: state.currentChallenge + 1,
        isCardFlipped: false,
      }));
    }
  };

  return (
    <div>
      {/* 
      // TODO: add prompt without react-router-dom since they don't  support it anymore right now
      <Prompt
        when={currentChallenge < 9}
        message="You haven't finished the session, are you sure you want to leave?"
      /> */}
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
              <div ref={conffetiRef} className="fixed inset-0" />
              <div className="fixed inset-0 flex flex-col flex-grow items-center justify-center content-center">
                <h2 className="font-medium text-3xl w-full mb-6 text-center">
                  {score.correct.length > score.wrong.length ||
                  score.correct.length > score.okay.length
                    ? "Nice Work!"
                    : "You'll get em next time"}
                </h2>
                <div>
                  <div className="flex items-center justify-center space-x-3">
                    <p className="font-normal flex flex-col justify-center items-center">
                      <span className="text-2xl font-medium text-wrong-base">
                        {score.wrong.length}
                      </span>
                      HARD
                    </p>
                    <p className="font-normal flex flex-col justify-center items-center">
                      <span className="text-2xl font-medium text-correct-base">
                        {score.correct.length}
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
                          score.wrong.length === 0 ? 0.2 : score.wrong.length
                        }`,
                      }}
                    />
                    <hr
                      className="h-1 mt-2 rounded-full bg-correct-base"
                      style={{
                        flexGrow: `${
                          score.correct.length === 0
                            ? 0.2
                            : score.correct.length
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
                  onClickHandle={() =>
                    endSessionHandle(
                      score,
                      currentUserDoc!,
                      courseID,
                      langID
                    ).then(() => navigate("/"))
                  }
                >
                  Continue
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="z-10 mt-5 flex w-11/12 items-center">
                <Link to="/">
                  <CircleExitIcon className="stroke-current w-8 h-8 pointer-events-none mr-2" />
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
                      isCardFlipped={isCardFlipped}
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
