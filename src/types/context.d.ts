/** AuthContext */
interface IuseAuth {
  currentUser: User | null;
  currentUserDoc: UserDoc | null;
  logout: () => void;
  getUserDoc: (uid: string) => Promise<void>;
  updateSettings: (type: string, value: any, uid: string) => Promise<void>;
}

/** LangContext */
interface IuseLang {
  coursesData: CourseDoc[];
  userActiveLangs: Formatted.LanguageDoc[];
  getCoursesData: () => Promise<void>;
  getActiveLangs: (activeLangs: UserDoc["activeLangs"]) => void;
}
