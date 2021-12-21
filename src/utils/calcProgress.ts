/**
 * Calculate the user's progress
 * @param overallWords - the course's words
 * @param userDoc - current user document
 * @param courseID - course ID (e.g. `51100`)
 * @param langID - language ID (e.g. `rus`)
 * @returns
 */
const calcProgress = (
  overallWords: CourseDoc["words"],
  userDoc: UserDoc,
  courseID: CoursesID,
  langID: langsID
): number => {
  const overallLength = overallWords.length;
  const userWordsLength = userDoc.progress[`course${courseID}`].filter(
    (word) => word[`${langID}_strength`] === 5
  ).length;
  return Math.round((100 * userWordsLength) / overallLength);
};

export default calcProgress;
