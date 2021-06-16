import lottie from "lottie-web";
import speaker from "../../../assets/lottie/speaker.json";
import { useEffect, useRef, useState } from "react";

// find the current word's srength based on the user's data.
const findWordStrength = (wordID, userDoc, courseID, langID) => {
  const findWord = userDoc.progress[`course${courseID}`].find(
    (result) => result.id === wordID
  );

  const wordStrength = findWord ? findWord[`${langID}_strength`] : 0;
  if (wordStrength > 0 && wordStrength < 2) return 20;
  if (wordStrength > 1 && wordStrength < 3) return 40;
  if (wordStrength > 2 && wordStrength < 4) return 60;
  if (wordStrength > 3 && wordStrength < 5) return 80;
  if (wordStrength === 5) return 100;
};

const WordRow = ({
  langID,
  wordID,
  wordEN,
  wordTranslation,
  courseID,
  currentUserDoc,
}) => {
  // States.
  const [wordStrength, setWordStrength] = useState(0);
  const playBtnRef = useRef(null);
  const wordAudio = new Audio(
    `/audio/${langID}Audio/${langID}-${wordTranslation.audioID}.flac`
  );

  useEffect(() => {
    lottie.loadAnimation({
      name: `speaker-${wordID}`,
      container: playBtnRef.current,
      renderer: "svg",
      loop: true,
      autoplay: false,
      animationData: speaker,
      initialSegment: [0, 30],
      rendererSettings: {
        className: "pointer-events-none", // to prevent click event on the svg/path.
      },
    });
  }, []);

  // making sure the function doesn't run unless the currentUserDoc has been loaded.
  useEffect(() => {
    if (Object.entries(currentUserDoc).length === 0) return;
    setWordStrength(findWordStrength(wordID, currentUserDoc, courseID, langID));
  }, [currentUserDoc]);

  const handleAudioClick = () => {
    wordAudio.play();
    lottie.play(`speaker-${wordID}`);
    wordAudio.onended = () => lottie.stop(`speaker-${wordID}`);
  };

  return (
    <>
      <hr className="mr-2 opacity-40 bg-[#BCBCBC] drop-shadow-sm rounded-full w-full h-[1px]" />
      <div className="flex items-center">
        <div className="flex flex-grow items-center py-4">
          <button
            onClick={handleAudioClick}
            className="focus:outline-none w-5 h-5 mr-3"
            ref={playBtnRef}
          />
          <h1 className="text-xl">
            <span className="font-medium">{wordTranslation.translation}</span>
            <span className="text-lg font-light"> - {wordEN}</span>
          </h1>
        </div>
        <div className="flex justify-center items-center w-1/4">
          <hr className="mr-4 opacity-40 bg-[#BCBCBC] drop-shadow-sm rounded-full h-4 w-[1px]" />
          <div className="relative bg-default-dark w-full h-2 overflow-hidden rounded-full">
            <div
              className="absolute left-0 bg-general-base h-full rounded-full"
              style={{ width: `${wordStrength}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WordRow;
