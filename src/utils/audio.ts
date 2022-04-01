import Lottie from "lottie-web";

/**
 * Handles the speaker icon click to play animation & audio
 * @param langID - Language ID
 * @param audioID - audio file name
 * @param wordID - word id
 */
export const handleAudioClick = (
  langID: langsID,
  audioID?: string,
  wordID?: number
) => {
  if (!audioID) return;
  const wordAudio = new Audio(`/audio/${langID}Audio/${audioID}.mp3`);
  const animationID = wordID ? `speaker-${wordID}` : "speaker";

  wordAudio.play();
  Lottie.play(animationID);
  wordAudio.onended = () => Lottie.stop(animationID);
};
