import lottie from "lottie-web";
import speaker from "../../../assets/lottie/speaker.json";
import { useEffect, useRef, useState } from "react";
import { handleAudioClick } from "../../../utils/audio";
import { inRange } from "lodash";

interface Props {
  wordID: Word["id"];
  wordEN: Word["en"];
  langID: langsID;
  wordTranslation: WordTranslation | undefined;
  courseID: CoursesID;
  currentUserDoc: UserDoc | null;
}

// find the current word's srength based on the user's data.
const findWordStrength = (
  wordID: number,
  userDoc: UserDoc,
  courseID: CoursesID,
  langID: langsID
) => {
  const userProgress = userDoc.progress[`course${courseID}`];
  const findWord = userProgress.find(({ id }) => id === wordID);
  const wordStrength = (findWord && findWord[`${langID}_strength`]) ?? 0;
  if (inRange(wordStrength, 0, 2)) return 20;
  if (inRange(wordStrength, 1, 3)) return 40;
  if (inRange(wordStrength, 2, 4)) return 60;
  if (inRange(wordStrength, 3, 5)) return 80;
  return 100;
};

const WordRow = ({
  langID,
  wordID,
  wordEN,
  wordTranslation,
  courseID,
  currentUserDoc,
}: Props) => {
  // States.
  const [wordStrength, setWordStrength] = useState<number>(0);
  const playBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!playBtnRef.current) return;
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
  }, [wordID]);

  // making sure the function doesn't run unless the `currentUserDoc` has been loaded.
  useEffect(() => {
    if (!currentUserDoc) return;
    setWordStrength(findWordStrength(wordID, currentUserDoc, courseID, langID));
  }, [courseID, currentUserDoc, langID, wordID]);

  return (
    <>
      <hr className="mr-2 opacity-40 bg-[#BCBCBC] drop-shadow-sm rounded-full w-full h-[1px]" />
      <div className="flex items-center">
        <div className="flex flex-grow items-center py-4">
          <button
            onClick={() =>
              handleAudioClick(langID, wordTranslation?.audioID, wordID)
            }
            className="focus:outline-none w-5 h-5 mr-3"
            ref={playBtnRef}
          />
          <h1 className="text-xl">
            <span className="font-medium">{wordTranslation?.translation}</span>
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
