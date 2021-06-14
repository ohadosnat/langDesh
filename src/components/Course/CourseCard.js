import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../Button";

// Calculate the user's progress
const calcProgress = (overallWords, userknownWords, courseID, langID) => {
  const whichCourse = `course${courseID}`;
  const overallLength = overallWords.length;
  const userWordsLength = userknownWords.progress[whichCourse].filter(
    (word) => word[`${langID}_strength`] === 5
  ).length;
  return Math.round((100 * userWordsLength) / overallLength);
};

const CourseCard = ({
  langID,
  wordsRange,
  courseName,
  wordsData,
  courseID,
  langTitle,
}) => {
  // User Document & useStates
  const { currentUserDoc } = useAuth();
  const [inPrecentProgress, setInPrecentProgress] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Init progress calculation on load.
  useEffect(() => {
    setInPrecentProgress(
      calcProgress(wordsData, currentUserDoc, courseID, langID)
    );
  }, []);

  // Handles Card Flip Animation.
  const handleFlip = (e) => {
    if (e.target.tagName !== "BUTTON") setIsFlipped(!isFlipped);
  };

  return (
    <div>
      <div className="card-scene h-64 mr-4 text-center">
        {/* Front */}
        <div
          onClick={handleFlip}
          className={`${
            isFlipped && "flipped"
          } card defaultBG flex flex-col justify-center items-center font-medium text-center py-4 px-6 h-64 w-52`}
        >
          <div className="w-full">
            <img src="/logo512.png" alt="" className="h-28 mx-auto" />
            <h1 className="font-medium mt-2 mb-1">{courseName}</h1>
            <hr className="opacity-40 bg-[#BCBCBC] drop-shadow-sm rounded-full w-full" />
          </div>
          <div className="flex mt-4 justify-around w-full ">
            <div>
              <div className="font-medium text-2xl">{wordsRange}</div>
              <div className="font-light text-sm">Words</div>
            </div>
            <hr className="w-[1px] h-4/5 my-auto opacity-40 bg-[#BCBCBC] drop-shadow-sm" />
            <div>
              <div className="font-medium text-2xl text-general-base">
                {inPrecentProgress}%
              </div>
              <div className="font-light text-sm">Completed</div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          onClick={handleFlip}
          className={`${isFlipped ? "" : "flipped"} 
          card defaultBG flex flex-col justify-center items-center font-medium text-center py-4 px-6 h-64 w-52`}
        >
          <div className="rounded-lg global-transition w-full h-full flex flex-col justify-evenly items-stretch">
            <Link to={`${langID}/${courseID}/session/quiz`}>
              <Button variant={langID} textColor="text-white">
                Quiz
              </Button>
            </Link>
            <Link to={`${langID}/${courseID}/session/flashcards`}>
              <Button variant={langID} textColor="text-white">
                FlashCards
              </Button>
            </Link>
            <Link
              to={{
                pathname: `${langID}/${courseID}/words`,
                state: {
                  courseName,
                  wordsRange,
                  wordsData,
                  inPrecentProgress,
                  langTitle,
                  langID,
                  courseID,
                },
              }}
            >
              <Button variant={langID} textColor="text-white">
                View Words
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
