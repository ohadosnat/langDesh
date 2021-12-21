import _ from "lodash"; // TODO: install @types/lodash
import { updateLangOrder, updateWords } from "./langs";

// Filter -> Extract -> Flatten = session's words.
/**
 *
 * @param wordsData
 * @param userDoc
 * @param langID
 * @param courseID
 * @returns
 */
const filterWords = (
  wordsData: Word[],
  userDoc: UserDoc,
  langID: langsID,
  courseID: CoursesID
) => {
  const userStorngestWords = userDoc.progress[`course${courseID}`].filter(
    (word) => word[`${langID}_strength`] === 5
  );
  const filtered =
    userStorngestWords.length <= Math.floor(wordsData.length * 0.8)
      ? _.differenceBy(wordsData, userStorngestWords, "id")
      : wordsData;
  return extractSessionWords(filtered, langID);
};

/**
 *
 * @param wordsData
 * @param langID
 * @returns
 */
const extractSessionWords = (wordsData: Word[], langID: langsID) => {
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

/**
 *
 * @param wordsData
 * @param langID
 * @returns
 */

/**
 * Flatten the given words into a session format.
 * @param wordsData - Words array
 * @param langID - languages ID
 * @returns an array of words in the correct format for a session
 */
const flattenWords = (wordsData: Word[], langID: langsID): ChallengeWord[] => {
  const words: ChallengeWord[] = [];
  wordsData.forEach(({ translations, id, en }) => {
    const correctTranslationValues = translations.find(
      ({ lang }) => lang === langID
    );

    if (!correctTranslationValues) return;

    const { audioID, en_pron, translation } = correctTranslationValues;

    // template
    const challenge: ChallengeWord = {
      id,
      en: en.split(", ")[0],
      audioID,
      en_pron,
      translation,
    };
    words.push(challenge);
  });

  return words;
};

// End Session
/**
 * End of session Handle, update the words in Firestore and update the language order.
 * @fires updateWords
 * @fires updateLangOrder
 * @param score - an array of word ids
 * @param currentUserDoc - current user document
 * @param courseID - course ID
 * @param langID - language ID
 */
export const endSessionHandle = async (
  score: Answers,
  currentUserDoc: UserDoc,
  courseID: CoursesID,
  langID: langsID
) => {
  updateWords(score, currentUserDoc, courseID, langID);
  await updateLangOrder(langID, currentUserDoc.activeLangs, currentUserDoc.uid);
};

export default filterWords;
