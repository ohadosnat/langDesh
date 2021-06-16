// Filter -> Extract -> Flatten = session's words.
const filterWords = (wordsData, userDoc, langID, courseID) => {
  const userStorngestWords = userDoc.progress[`course${courseID}`].filter(
    (word) => word[`${langID}_strength`] === 5
  );
  const filtered = wordsData.filter((word, i) => {
    return userStorngestWords[i] !== undefined
      ? word.id !== userStorngestWords[i].id
      : " ";
  });

  return extractSessionWords(filtered, langID);
};

const extractSessionWords = (wordsData, langID) => {
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

const flattenWords = (wordsData, langID) => {
  const temp = [];
  wordsData.forEach((word) => {
    const correctTranslationValues = word.translations.find(
      (translate) => translate.lang === langID
    );
    const { audioID, en_pron, translation } = correctTranslationValues;
    // template
    const challenge = {
      id: word.id,
      en: word.en.split(", ")[0],
      audioID,
      en_pron,
      translation,
    };
    temp.push(challenge);
  });

  return temp;
};

export default filterWords;
