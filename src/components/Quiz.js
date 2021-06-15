import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useForm } from "../customHooks/useForm";
import QuizInput from "./QuizInput";
import Button from "./Button";
import WordCard from "./WordCard";

// Filter -> Extract -> Flatten = session's words.
const filterWords = (wordsData, userDoc, langID, courseID) => {
  const userStorngestWords = userDoc.progress[`course${courseID}`].filter(
    (word) => word[`${langID}_strength`] === 5
  );
  const filtered = wordsData.filter((word, i) => {
    return userStorngestWords[i] !== undefined
      ? word.id !== userStorngestWords[i].id
      : " ";
  });

  return extractSessionWords(filtered, langID);
};

const extractSessionWords = (wordsData, langID) => {
  const list = wordsData.map((x) => x); // copy of the data
  // Fisher-Yates Shuffle Modern Algorithm
  for (let i = list.length; i > 1; i--) {
    let random = Math.floor(Math.random() * i);
    let temp = list[random];
    list[random] = list[i - 1];
    list[i - 1] = temp;
  }
  return flattenWords(list.slice(0, 10), langID);
};

const flattenWords = (wordsData, langID) => {
  const temp = [];
  wordsData.forEach((word) => {
    const correctTranslationValues = word.translations.find(
      (translate) => translate.lang === langID
    );
    const { audioID, en_pron, translation } = correctTranslationValues;
    // template
    const challenge = {
      id: word.id,
      en: word.en.split(", ")[0],
      audioID,
      en_pron,
      translation,
    };
    temp.push(challenge);
  });

  return temp;
};

// Start of Component
const Quiz = () => {
  // Init States
  const { currentUserDoc } = useAuth();
  const { state } = useLocation();
  const { courseID, langID, wordsData } = state;
  const [challenges, setChallenges] = useState([]);
  const [displayChallenges, setDisplayChallenges] = useState(false);

  // Quiz States
  // Input
  const [values, handleChange] = useForm({ answer: "" });
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  // User stats (score, streak)
  const [score, setScore] = useState({ correct: 0, wrong: 0, skipped: 0 }); // save id with each submit, for example: correct: [1, 3, 5, 7], wrong: [2,4,6,8], skipped: [9, 10]
  const [streak, setStreak] = useState(0);
  // Session's states - words, show score & feedback message
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  // Button
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [btnVaritant, setBtnVaritant] = useState("disabled");

  useEffect(() => {
    if (Object.entries(currentUserDoc).length === 0) return; // making sure currentUserDoc loads.
    setChallenges(filterWords(wordsData, currentUserDoc, langID, courseID));
    setDisplayChallenges(true);
  }, [currentUserDoc]);

  // Handles Button Change.
  useEffect(() => {
    if (values.answer === "") {
      setIsButtonDisabled(true);
      setBtnVaritant("disabled");
    } else {
      setIsButtonDisabled(false);
      setBtnVaritant("default");
    }
  }, [values.answer]);

  // Checks Answer
  const handleCheck = (e) => {
    e.preventDefault();

    if (currentChallenge + 1 === challenges.length) return;
    if (
      values.answer.toLowerCase() === challenges[currentChallenge].en &&
      !isInputDisabled
    ) {
      setBtnVaritant("correct");
      setFeedbackMsg("Nice Work!");
      setIsInputDisabled(true);
      setIsCardFlipped(true);
      setStreak(streak + 1);
      setScore((prevState) => ({ ...prevState, correct: score.correct + 1 }));
    } else if (
      values.answer.toLowerCase() !== challenges[currentChallenge].en &&
      !isInputDisabled
    ) {
      setBtnVaritant("wrong");
      setFeedbackMsg("There’s always next time!");
      setIsInputDisabled(true);
      setIsCardFlipped(true);
      setStreak(0);
      setScore((prevState) => ({ ...prevState, wrong: score.wrong + 1 }));
    }
    if (btnVaritant === "correct" || btnVaritant === "wrong") {
      values.answer = "";
      setFeedbackMsg("");
      setCurrentChallenge(currentChallenge + 1);
      setIsInputDisabled(false);
      setIsCardFlipped(false);
    }
  };

  return (
    <div className="relative h-screen font-medium flex flex-col items-center">
      <div className="mt-5 flex w-11/12 items-center">
        <svg
          className="stroke-current w-8 h-8 pointer-events-none mr-2"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
            stroke="black"
            stroke-width="2"
            stroke-miterlimit="10"
          />
          <path
            d="M12.4645 19.5355L19.5355 12.4645"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.4645 12.4645L19.5355 19.5355"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
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
            {/* streak > 0 ? :  */}
            <circle
              cx="17"
              cy="17"
              r="16"
              stroke={streak > 0 ? "#FFE5BF" : "black"}
              fill={streak > 0 && "#FFE5BF"}
              stroke-width="2"
            />

            <path
              d="M11.7534 11.1273C10.306 13.3091 9.125 15.8014 9.125 18.125C9.125 20.2136 9.95468 22.2166 11.4315 23.6935C12.9084 25.1703 14.9114 26 17 26C19.0886 26 21.0916 25.1703 22.5685 23.6935C24.0453 22.2166 24.875 20.2136 24.875 18.125C24.875 13.25 21.5 9.50002 18.7647 6.76923L18.7646 6.7693L15.5 13.625L11.7535 11.1273L11.7534 11.1273Z"
              stroke={streak > 0 ? "#FC4F4F" : "black"}
              fill={streak > 0 && "#FC4F4F"}
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M21.8177 18.875C21.6582 19.8966 21.1783 20.841 20.4472 21.5721C19.7161 22.3032 18.7716 22.7832 17.7501 22.9426"
              stroke={streak > 0 ? "white" : "black"}
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          {streak > 0 && (
            <span className="absolute -right-2 -top-2 rounded-full h-5 w-5 text-sm  flex justify-center items-center bg-generalOrange-base">
              {streak}
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
        <form onSubmit={(e) => handleCheck(e)} className="w-4/5 text-center">
          <div className="w-full border-b-2 border-[#BCBCBC] border-opacity-50 my-5">
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
            <Button
              type="button"
              variant="transparent"
              textColor="text-wrong-base"
            >
              Don't know this word
            </Button>
            <Button
              type="submit"
              variant={btnVaritant}
              isDisabled={isButtonDisabled}
            >
              Check
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Quiz;

/*
[x] grab 10 random words between strength 0 to 4.
  [x] need user's words.
  [x] need course words.


  REFRENCE:
    // Fisher-Yates Shuffle Modern Algorithm
    for (let i = wordsData.length; i > 1; i--) {
        let random = Math.floor(Math.random() * i);
        let temp = wordsData[random];
        wordsData[random] = wordsData[i - 1];
        wordsData[i - 1] = temp;
    };


*/
