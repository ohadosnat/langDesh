// Calculate the user's progress
const calcProgress = (overallWords, userknownWords, courseID, langID) => {
  const whichCourse = `course${courseID}`;
  const overallLength = overallWords.length;
  const userWordsLength = userknownWords.progress[whichCourse].filter(
    (word) => word[`${langID}_strength`] === 5
  ).length;
  return Math.round((100 * userWordsLength) / overallLength);
};

export default calcProgress;
