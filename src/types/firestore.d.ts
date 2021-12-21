interface LanguageDoc {
  flagPath: string;
  lang: string;
}

interface CourseDoc {
  id: CoursesID;
  courseName: string;
  words: Word[];
  wordsRange: "1-50" | "51-100" | "101-153" | "154-207";
}

interface Word {
  en: string;
  id: number;
  translations: WordTranslation[];
}

interface WordTranslation {
  audioID: string;
  en_pron: string;
  lang: string;
  translation: string;
}

/** Firestore User Document */
interface UserDoc {
  uid: string;
  name: string;
  soundEffects: boolean;
  progress: UserProgress;
  activeLangs: langsID[];
}

/** User Courses Progress Object inside a User Document (Firestore) */
interface UserProgress {
  course150: WordProgress[];
  course51100: WordProgress[];
  course101153: WordProgress[];
  course154207: WordProgress[];
}

/** Word Progress Object (Firestore) */
interface WordProgress {
  id: number;
  ita_strength?: number;
  rus_strength?: number;
  fra_strength?: number;
  spa_strength?: number;
}
