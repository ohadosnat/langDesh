import React, { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import speaker from "../assets/lottie/speaker.json";

const WordCard = ({ wordData, langID, isQuiz, isCardFlipped }) => {
  const [flag, setFlag] = useState("");
  const [wordAudio, setWordAudio] = useState("");
  const [isFlipped, setisFlipped] = useState(false);
  const frontPlayBtn = useRef(null);
  const backPlayBtn = useRef(null);
  const { en, audioID, en_pron, translation } = wordData;

  useEffect(() => {
    setFlag(`/assets/imgs/flags/${langID}-flag.png`);
    setWordAudio(new Audio(`/audio/${langID}Audio/${audioID}.mp3`));

    // font animation
    lottie.loadAnimation({
      name: "speaker",
      container: frontPlayBtn.current,
      renderer: "svg",
      loop: true,
      autoplay: false,
      animationData: speaker,
      initialSegment: [0, 30],
      rendererSettings: {
        className: "pointer-events-none", // to prevent click event on the svg/path.
      },
    });
    // back animation
    lottie.loadAnimation({
      name: "speaker",
      container: backPlayBtn.current,
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

  useEffect(() => {
    setisFlipped(isCardFlipped);
  }, [isCardFlipped]);

  const handleFlip = (e) => {
    if (e.target.tagName !== "BUTTON") {
      setisFlipped(!isFlipped);
    }
  };

  const handleAudioClick = () => {
    wordAudio.play();
    lottie.play("speaker");
    wordAudio.onended = () => {
      lottie.stop("speaker");
    };
  };

  return (
    <div>
      <div
        style={{ perspective: "1000px" }}
        className="w-52 h-52 relative text-center"
      >
        {/* Front */}
        <div
          onClick={!isQuiz ? handleFlip : undefined}
          className={`${
            isFlipped ? "flipped" : ""
          } card relative border-2 border-[#BCBCBC] border-opacity-10 bg-default-base rounded-lg shadow-sm h-full w-full flex  flex-col justify-center items-center font-medium`}
        >
          <img
            src={flag}
            alt=""
            className="absolute top-4  right-4 w-9 shadow-sm rounded-[4px] border-black border border-opacity-10"
          />
          <h1 className="text-3xl">{translation}</h1>
          <h2 className="opacity-50 font-light text-xl">{en_pron}</h2>
          <button
            ref={frontPlayBtn}
            onClick={handleAudioClick}
            className="absolute bottom-5 focus:outline-none w-8 h-8"
          />
        </div>

        <div
          onClick={!isQuiz ? handleFlip : undefined}
          className={`${
            isFlipped ? "" : "flipped"
          } card relative border-2 border-[#BCBCBC] border-opacity-10 bg-default-base rounded-lg shadow-sm h-full w-full flex flex-col justify-center items-center font-medium`}
        >
          <img
            src={flag}
            alt=""
            className="absolute top-5 right-5 w-9 shadow-sm rounded-[4px] border-black border border-opacity-10"
          />
          <h1 className="text-3xl">{en}</h1>
          <h2 className="opacity-50 font-light text-xl">{translation}</h2>
          <button
            ref={backPlayBtn}
            onClick={handleAudioClick}
            className="absolute bottom-5 focus:outline-none w-8 h-8"
          />
        </div>
      </div>
    </div>
  );
};

export default WordCard;
