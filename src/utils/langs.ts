import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
} from "@firebase/firestore";
import { database } from "./firebaseConfig";
import { updateDocumentInCollection } from "./firestore";

/**
 * Handles adding a new language to the "activeLangs" array for a user document.
 * @param uid - user UID
 * @param langID - The language ID
 * @example addNewActiveLang(uid, "rus")
 */
export const addNewActiveLang = async (uid: string, langID: langsID) => {
  await updateDocumentInCollection("users", uid, {
    activeLangs: arrayUnion(langID),
  });
};

/**
 * fetching all docs inside the langs collection and formats them.
 * @returns a formatted language list
 */
export const getAllLangs = async (): Promise<
  Formatted.LanguageDoc[] | undefined
> => {
  try {
    const langsList: Formatted.LanguageDoc[] = [];
    const req = await getDocs(collection(database, "langs"));
    req.forEach((result) => {
      const formattedLangDoc = formatLangDoc(
        result.data() as LanguageDoc,
        result.id as langsID
      );
      langsList.push(formattedLangDoc);
    });

    return langsList;
  } catch (error) {
    const errorMessage: ErrorMessage = {
      message:
        "An error occured while fetching the languages collection from Firestore",
      error,
    };
    console.error(errorMessage);
  }
};

/**
 * Gets a Language Document based on the `langID`
 * @param langID - the language ID to fetch
 * @returns a language Document
 * @example getLangDoc("rus")
 */
export const getLangDoc = async (langID: string) => {
  try {
    const res = await getDoc(doc(database, "langs", langID));
    return res.data() as LanguageDoc;
  } catch (error) {
    const errorMessage: ErrorMessage = {
      message:
        "An error occured while fetching a language document from Firestore",
      error,
    };
    console.error(errorMessage);
  }
};

/**
 * Formats a Language Document
 * @param document - The language document
 * @param langID - The language ID
 * @returns a formatted Language Document
 * @example formatLangDoc(doc, "rus")
 */
export const formatLangDoc = (
  document: LanguageDoc,
  langID: langsID
): Formatted.LanguageDoc => {
  const { flagPath, lang } = document;
  return { name: lang, id: langID, flagPath };
};

/**
 * Updates activeLangs order to display the most recent one.
 * @param langID - Language ID
 * @param activeLangs - Active Languages Array
 * @param uid - User UID
 * @example updateLangOrder("rus", ["ita", "spa", "rus"], uid)
 */
export const updateLangOrder = async (
  langID: langsID,
  activeLangs: string[],
  uid: string
): Promise<void> => {
  const valueIndex = activeLangs.indexOf(langID);
  activeLangs.splice(valueIndex, 1);
  activeLangs.splice(0, 0, langID);
  await updateDocumentInCollection("users", uid, { activeLangs });
};

// Update Words Wrapper
// Scoring: Correct/Easy = +0.5 | Hard/Wrong/Skip = -0.5 | Okay = No Change.
/**
 * Update Words Wrapper Function
 * @param answers - Answers array
 * @param currentUserDoc - current user document
 * @param courseID - course ID
 * @param langID - language ID
 * @fires updateWordStrength
 */
export const updateWords = (
  answers: Answers,
  currentUserDoc: UserDoc,
  courseID: CoursesID,
  langID: langsID
) => {
  if (answers.correct.length) {
    answers.correct.forEach((wordID) => {
      updateWordStrength(currentUserDoc, wordID, "correct", courseID, langID);
    });
  }

  if (answers.wrong.length) {
    answers.wrong.forEach((wordID) => {
      updateWordStrength(currentUserDoc, wordID, "wrong", courseID, langID);
    });
  }
};

/**
 * Update Word Strength - Determine the word strength and update it on Firestore
 * @param userDoc - User Firestore Document
 * @param id - The Word ID
 * @param type - Type of scorring `correct` or `wrong`
 * @param courseID - Course ID
 * @param langID - The Language ID
 * @fires `updateWordInFirestore` - to update it inside Firestore
 * @example updateWordStrength(userDoc, 1, "correct", 150, "rus")
 */
const updateWordStrength = async (
  userDoc: UserDoc,
  id: number,
  type: "correct" | "wrong",
  courseID: CoursesID,
  langID: langsID
) => {
  const { progress, uid } = userDoc;
  const userCourseProgress = progress[`course${courseID}`];
  const word = userCourseProgress.find((word) => word.id === id); // find word

  if (!word) {
    // no word, create new (if first time correct +0.5, otherwise 0)
    userCourseProgress.push({
      id,
      [`${langID}_strength`]: type === "correct" ? 0.5 : 0,
    });
  } else if (!word[`${langID}_strength`]) {
    // word exists, but no lang strength, set initial strength
    word[`${langID}_strength`] = type === "correct" ? 0.5 : 0;
  } else if (type === "correct" && word[`${langID}_strength`]! < 5) {
    // word & lang strength exists, update correct
    word[`${langID}_strength`]! += 0.5;
  } else {
    // word & lang strength exists, update wrong/skipped
    word[`${langID}_strength`]! > 0 && (word[`${langID}_strength`]! -= 0.5);
  }

  // return {userCourseProgress, uid, courseID}
  await updateWordInFirestore(userCourseProgress, uid, courseID);
};

/**
 * Updates the words data inside the user's document on Firestore
 * @param data - Word Progress Array
 * @param uid - User UID
 * @param courseID - Course ID
 * @fires updateDocumentInCollection - to update the document.
 */
export const updateWordInFirestore = async (
  data: WordProgress[],
  uid: string,
  courseID: number
) => {
  const set = new Set([150, 51100, 101153, 154207]); // O(1)
  if (!set.has(courseID)) return console.error("invalid course id", courseID); // O(1)

  const coursePath = `progress.course${courseID}`;
  await updateDocumentInCollection("users", uid, { [coursePath]: data });
};
