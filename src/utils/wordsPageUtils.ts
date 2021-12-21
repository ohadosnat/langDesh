// filtering by word/translation/level
export const searchWords = (
  userDoc: UserDoc,
  input: string,
  wordsData: Word[],
  langID: langsID,
  courseID: CoursesID
) => {
  const userProgress = userDoc.progress[`course${courseID}`];
  const searchVal = input.toLocaleLowerCase().trim();
  const filteredWordsProgress: Set<number> = new Set();

  userProgress.forEach(
    (word) =>
      word[`${langID}_strength`] === parseFloat(searchVal) &&
      filteredWordsProgress.add(word.id)
  );

  if (filteredWordsProgress.size) {
    return wordsData.filter(({ id }) => filteredWordsProgress.has(id));
  }

  return wordsData.filter(({ en, translations }) => {
    const wordEN = en.toLocaleLowerCase();
    const wordTran = translations
      .find(({ lang }) => lang === langID)
      ?.translation.toLocaleLowerCase();
    return wordEN.includes(searchVal) || wordTran?.includes(searchVal);
  });
};

// Finds the correct translation for a word based on the current lang.
export const findCorrectTranslation = (
  translations: WordTranslation[],
  langID: langsID
) => {
  return translations.find(({ lang }) => lang === langID);
};
