// React, Firestore, and Utils
import { createContext, ReactNode, useContext, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../utils/firebaseConfig";
import { formatLangDoc, getLangDoc } from "../utils/langs";

// Create Context
const LangsContext = createContext<IuseLang>({} as IuseLang);

// Hook
export const useLangs = () => useContext(LangsContext);

export const LangsProvider = ({ children }: { children: ReactNode }) => {
  const [coursesData, setCoursesData] = useState<CourseDoc[]>([]);
  const [userActiveLangs, setUserActiveLangs] = useState<
    Formatted.LanguageDoc[]
  >([]);

  /** Get all the courses data and sets them inside the `coursesData` local state. */
  const getCoursesData = async () => {
    setCoursesData([]); // reset course data
    try {
      const coursesCollection = await getDocs(collection(database, "courses"));
      coursesCollection.forEach((doc) =>
        setCoursesData((prev) => [...prev, doc.data() as CourseDoc])
      );
    } catch (error) {
      const errorMessage = {
        message: "An error occured while running getCoursesData",
        error,
      };
      console.error(errorMessage);
    }
  };

  /**
   * Gets the user's active languages and sets the `userActiveLangs` local state.
   * @param activeLangs - An array of the user's active languages. Contains languages IDs
   */
  const getActiveLangs = (activeLangs: UserDoc["activeLangs"]) => {
    setUserActiveLangs([]); // reset data
    activeLangs.forEach(async (langID) => {
      const doc = await getLangDoc(langID);
      if (!doc) return; // no document/error
      const formattedDoc = formatLangDoc(doc, langID);
      setUserActiveLangs((prev) => [...prev, formattedDoc]);
    });
  };

  const values: IuseLang = {
    coursesData,
    userActiveLangs,
    getCoursesData,
    getActiveLangs,
  };
  return (
    <LangsContext.Provider value={values}>{children}</LangsContext.Provider>
  );
};
