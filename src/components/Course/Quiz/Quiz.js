import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory, useLocation, Prompt } from "react-router-dom";
import lottie from "lottie-web";
import "../../Dashboard/animations.css";
import { useAuth } from "../../../contexts/AuthContext";
import { useForm } from "../../../customHooks/useForm";
import { useLangs } from "../../../contexts/LangsContext";
import QuizInput from "./QuizInput";
import Button from "../../Button";
import WordCard from "../../WordCard";
import getRandomLoader from "../../../utils/randomLoader";
import filterWords from "../../../utils/sessionFuncs";
import confetti from "../../../assets/lottie/confetti.json";

// Sounds & Animations Refs
const correctSound = new Audio("/audio/correct.mp3");
const wrongSound = new Audio("/audio/wrong.mp3");
const startLoadingAnimation = { animation: "startLoading 500ms ease-in-out" };
const endLoadingAnimation = { animation: " endLoading 500ms ease-in-out" };

const Quiz = () => {
  // custom hooks
  const { updateWords, updateLangOrder } = useLangs();
  const history = useHistory();
  const { currentUserDoc } = useAuth();
  const { state } = useLocation();
  const { courseID, langID, wordsData } = state;
  // Input
  const [values, handleChange] = useForm({ answer: "" });
  // Loading States
  const [isLoading, setIsLoading] = useState(true);
  const [toAnimate, setToAnimate] = useState(true);
  const loadingRef = useRef(null);
  const [loader, setLoader] = useState({});

  // end of session animation ref
  const conffetiRef = useRef(null);

  // Session's Challenges
  const [challenges, setChallenges] = useState([]);
  const [displayChallenges, setDisplayChallenges] = useState(false);

  // User stats (score, streak)
  const [score, setScore] = useState({
    correct: [],
    wrong: [],
    skipped: [],
    streak: 0,
  });

  const [
    {
      currentChallenge,
      feedbackMsg,
      isCardFlipped,
      isInputDisabled,
      showScore,
      isButtonDisabled,
      btnVaritant,
    },
    setSession,
  ] = useState({
    currentChallenge: 0,
    feedbackMsg: "",
    isCardFlipped: false,
    isInputDisabled: false,
    isButtonDisabled: true,
    btnVaritant: "disabled",
    showScore: false,
  });

  useEffect(() => {
    if (Object.entries(currentUserDoc).length === 0) return; // making sure currentUserDoc loads.
    setChallenges(filterWords(wordsData, currentUserDoc, langID, courseID));
    setDisplayChallenges(true);
  }, [currentUserDoc]);

  useState(() => {
    setLoader(getRandomLoader());
  }, []);

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

  // Handles Button Change.
  useEffect(() => {
    if (values.answer === "") {
      setSession((data) => ({
        ...data,
        isButtonDisabled: true,
        btnVaritant: "disabled",
      }));
    } else {
      setSession((data) => ({
        ...data,
        isButtonDisabled: false,
        btnVaritant: "default",
      }));
    }
  }, [values.answer]);

  useEffect(() => {
    if (showScore) {
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

  // Checks Answer
  const handleCheck = (e) => {
    e.preventDefault();

    const correctAnswer = challenges[currentChallenge].en
      .split(" (")[0]
      .toLowerCase();
    const userAnswer = values.answer.toLowerCase().trim();

    // correct
    if (userAnswer === correctAnswer && !isInputDisabled) {
      currentUserDoc.soundEffects && correctSound.play();
      setSession((data) => ({
        ...data,
        feedbackMsg: "Nice Work!",
        isCardFlipped: true,
        isInputDisabled: true,
        btnVaritant: "correct",
      }));
      setScore((prevState) => ({
        ...prevState,
        correct: [...score.correct, challenges[currentChallenge].id],
        streak: score.streak + 1,
      }));
    }
    // wrong
    if (userAnswer !== correctAnswer && !isInputDisabled) {
      currentUserDoc.soundEffects && wrongSound.play();
      setSession((data) => ({
        ...data,
        feedbackMsg: "There’s always next time!",
        isCardFlipped: true,
        isInputDisabled: true,
        btnVaritant: "wrong",
      }));
      setScore((prevState) => ({
        ...prevState,
        wrong: [...score.wrong, challenges[currentChallenge].id],
        streak: 0,
      }));
    }
    if (btnVaritant === "correct" || btnVaritant === "wrong") {
      if (currentChallenge + 1 === challenges.length)
        return setSession((data) => ({ ...data, showScore: true }));
      values.answer = "";
      setSession((data) => ({
        ...data,
        currentChallenge: currentChallenge + 1,
        feedbackMsg: "",
        isCardFlipped: false,
        isInputDisabled: false,
        isButtonDisabled: true,
        btnVaritant: "disabled",
      }));
    }
  };

  // Skip Challenge
  const skipHandle = () => {
    currentUserDoc.soundEffects && wrongSound.play();
    setSession((data) => ({
      ...data,
      feedbackMsg: "There’s always next time!",
      isCardFlipped: true,
      isInputDisabled: true,
      isButtonDisabled: false,
      btnVaritant: "wrong",
    }));

    setScore((prevState) => ({
      ...prevState,
      skipped: [...score.skipped, challenges[currentChallenge].id],
      streak: 0,
    }));
  };

  // End Session
  const endSessionHandle = async () => {
    try {
      await updateWords(score, currentUserDoc, courseID, langID);
      await updateLangOrder(
        langID,
        currentUserDoc.activeLangs,
        currentUserDoc.uid
      );
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Prompt
        when={currentChallenge < 9}
        message="You haven't finished the session, are you sure you want to leave?"
      />
      {isLoading ? (
        <div
          style={toAnimate ? startLoadingAnimation : endLoadingAnimation}
          className="flex flex-col justify-center text-center mx-auto fixed inset-0 h-full"
        >
          <div>
            <div ref={loadingRef} className="mx-auto w-60 -mb-10" />
            <p className="font-medium text-xl">Get Ready!</p>
          </div>
        </div>
      ) : (
        <div className="relative h-screen font-medium flex flex-col items-center lg:mx-auto lg:w-3/5 2xl:w-2/5">
          {showScore ? (
            // confetti animation
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
                  score.correct.length > score.skipped.length
                    ? "Nice Work!"
                    : "You'll get em next time"}
                </h2>
                <div>
                  <div className="flex items-center justify-center space-x-3">
                    <p className="font-normal flex flex-col justify-center items-center">
                      <span className="text-2xl font-medium text-wrong-base">
                        {score.wrong.length}
                      </span>
                      WRONG
                    </p>
                    <p className="font-normal flex flex-col justify-center items-center">
                      <span className="text-2xl font-medium text-correct-base">
                        {score.correct.length}
                      </span>
                      CORRECT
                    </p>
                    <p className="font-normal flex flex-col justify-center items-center">
                      <span className="text-2xl font-medium text-generalOrange-base">
                        {score.skipped.length}
                      </span>
                      SKIPPED
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
                          score.skipped.length === 0
                            ? 0.2
                            : score.skipped.length
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
              <div className="mt-5 flex w-11/12 items-center lg:mt-10">
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
                <div className="relative flex items-center">
                  <svg
                    className="stroke-current w-8 h-8 pointer-events-none ml-2 general-transition"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="17"
                      cy="17"
                      r="16"
                      stroke={score.streak > 0 ? "#FFE5BF" : "black"}
                      fill={score.streak > 0 ? "#FFE5BF" : undefined}
                      strokeWidth="2"
                    />

                    <path
                      d="M11.7534 11.1273C10.306 13.3091 9.125 15.8014 9.125 18.125C9.125 20.2136 9.95468 22.2166 11.4315 23.6935C12.9084 25.1703 14.9114 26 17 26C19.0886 26 21.0916 25.1703 22.5685 23.6935C24.0453 22.2166 24.875 20.2136 24.875 18.125C24.875 13.25 21.5 9.50002 18.7647 6.76923L18.7646 6.7693L15.5 13.625L11.7535 11.1273L11.7534 11.1273Z"
                      stroke={score.streak > 0 ? "#FC4F4F" : "black"}
                      fill={score.streak > 0 ? "#FC4F4F" : undefined}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21.8177 18.875C21.6582 19.8966 21.1783 20.841 20.4472 21.5721C19.7161 22.3032 18.7716 22.7832 17.7501 22.9426"
                      stroke={score.streak > 0 ? "white" : "black"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {score.streak > 0 && (
                    <span className="absolute -right-2 -top-2 rounded-full h-5 w-5 text-sm  flex justify-center items-center bg-generalOrange-base">
                      {score.streak}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-4/5 flex flex-col justify-center items-center h-full flex-grow">
                <div>
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
                <form
                  onSubmit={(e) => handleCheck(e)}
                  className="w-4/5 text-center"
                >
                  <div
                    className={`"w-full border-b-2 border-opacity-50 my-5 global-transition ${
                      btnVaritant === "correct"
                        ? "border-correct-dark text-correct-dark"
                        : btnVaritant === "wrong"
                        ? "border-wrong-dark text-wrong-dark"
                        : "border-[#BCBCBC]"
                    }`}
                  >
                    <QuizInput
                      inputName="answer"
                      placeholder="Translate in English"
                      value={values.answer}
                      onChangeValue={handleChange}
                      isDisabled={isInputDisabled}
                    />
                  </div>
                  <p>{feedbackMsg}</p>
                  <div className="space-y-2 mt-10">
                    {!isInputDisabled && (
                      <Button
                        type="button"
                        variant="transparent"
                        textColor="text-wrong-base"
                        onClickHandle={skipHandle}
                      >
                        Don't know this word
                      </Button>
                    )}

                    <Button
                      type="submit"
                      variant={btnVaritant}
                      isDisabled={isButtonDisabled}
                    >
                      {btnVaritant === "default" || btnVaritant === "disabled"
                        ? "Check"
                        : "Continue"}
                    </Button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Quiz;
