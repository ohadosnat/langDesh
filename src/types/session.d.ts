/** Sessions */

interface SessionLocationState {
  wordsData: Word[];
  langID: langsID;
  courseID: CoursesID;
}

interface ChallengeWord extends Partial<WordTranslation> {
  id: number;
  en: string;
  audioID: string;
  en_pron: string;
  translation: string;
}

interface CurrentSession {
  currentChallenge: number;
  isCardFlipped: boolean;
  showScore: boolean;
}

interface QuizCurrentSession extends CurrentSession {
  feedbackMsg: string;
  isInputDisabled: boolean;
  isButtonDisabled: boolean;
  btnVaritant: "disabled" | "default" | "wrong" | "correct";
}

interface Answers {
  correct: number[];
  wrong: number[];
}

interface FlashcardsScore extends Answers {
  okay: number[];
}

interface QuizScore extends Answers {
  skipped: number[];
  streak: number;
}
