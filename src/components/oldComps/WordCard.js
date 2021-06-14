import React, { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import speaker from "../../assets/lottie/speaker.json";

const WordCard = ({ type, data, isQuiz }) => {
  const {
    flag,
    challenges: { en, en_pron, audio, translation },
  } = data;

  const frontPlayBtn = useRef(null);
  const backPlayBtn = useRef(null);
  const wordAudio = new Audio(`/audio/${audio}.flac`);
  const flagPath = `/assets/imgs/flags/${flag}`;
  const [isFlipped, setisFlipped] = useState(false);

  useEffect(() => {
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
    <>
      <div className="card-scene">
        <div
          onClick={!isQuiz ? handleFlip : ""}
          className={`${
            isFlipped ? "flipped" : ""
          } card relative border-2 border-[#BCBCBC] border-opacity-10 bg-default-base rounded-lg shadow-sm h-52 w-52 flex  flex-col justify-center items-center font-medium`}
        >
          <img
            src={flagPath}
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
          onClick={!isQuiz ? handleFlip : ""}
          className={`${
            isFlipped ? "" : "flipped"
          } card relative border-2 border-[#BCBCBC] border-opacity-10 bg-default-base rounded-lg shadow-sm h-52 w-52 flex  flex-col justify-center items-center font-medium`}
        >
          <img
            src={flagPath}
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
    </>
  );
};

export default WordCard;
