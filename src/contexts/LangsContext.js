import React, { createContext, useContext, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { database } from "../utils/firebaseConfig";
import { useAuth } from "./AuthContext";

const LangsContext = createContext();

export function useLangs() {
  return useContext(LangsContext);
}

export const LangsProvider = ({ children }) => {
  const { getUserDoc } = useAuth();
  const [coursesData, setCoursesData] = useState([]);
  const [userActiveLangs, setUserActiveLangs] = useState([]);

  // fetching all the courses data and sets them inside the coursesData array.
  const getCoursesData = () => {
    setCoursesData([]);
    database.courses.get().then((snapshot) => {
      snapshot.docs.forEach((doc) =>
        setCoursesData((prev) => [...prev, doc.data()])
      );
    });
  };

  // handles adding a new language to the "activeLangs" array for a user.
  const addNewActiveLang = async (uid, lang) => {
    await database.users.doc(uid).update({
      activeLangs: firebase.firestore.FieldValue.arrayUnion(lang),
    });
    await getUserDoc(uid);
  };

  // fetching all docs inside the langs collection
  const getAllLangs = async () => {
    const req = await database.langs.get();
    const data = req.docs;
    const langsList = [];
    data.forEach((result) => {
      const { flagPath, lang } = result.data();
      const formatedData = { name: lang, id: result.id, flagPath };
      langsList.push(formatedData);
    });
    return langsList;
  };

  // Gets a Language Document.
  const getLangDoc = async (langID) => {
    const res = await database.langs.doc(langID).get();
    const { flagPath, lang } = res.data();
    const formatedData = { name: lang, id: langID, flagPath };
    return formatedData;
  };

  // Gets the user's active languages and sets the userActiveLangs array.
  const getActiveLangs = (userDoc) => {
    userDoc.activeLangs.forEach((langID) => {
      getLangDoc(langID).then((results) =>
        setUserActiveLangs((prev) => [...prev, results])
      );
    });
  };

  // Update Words Wrapper
  const updateWords = (score, currentUserDoc, courseID, langID) => {
    if (score.correct && score.correct.length > 0) {
      score.correct.forEach((wordID) => {
        updateWordSrength(currentUserDoc, wordID, "correct", courseID, langID);
      });
    }
    if (score.wrong && score.wrong.length > 0) {
      score.wrong.forEach((wordID) => {
        updateWordSrength(currentUserDoc, wordID, "wrong", courseID, langID);
      });
    }
    if (score.skipped && score.skipped.length > 0) {
      score.skipped.forEach((wordID) => {
        updateWordSrength(currentUserDoc, wordID, "skipped", courseID, langID);
      });
    }
    if (score.easy && score.easy.length > 0) {
      score.easy.forEach((wordID) => {
        updateWordSrength(currentUserDoc, wordID, "correct", courseID, langID);
      });
    }
    if (score.hard && score.hard.length > 0) {
      score.hard.forEach((wordID) => {
        updateWordSrength(currentUserDoc, wordID, "wrong", courseID, langID);
      });
    }
  };

  // Update word strength
  const updateWordSrength = (userDoc, id, type, courseID, langID) => {
    const coursePath = userDoc.progress[`course${courseID}`];
    const word = coursePath.find((word) => word.id === id);

    if (type === "correct") {
      if (word) {
        word[`${langID}_strength`]
          ? (word[`${langID}_strength`] += 0.5)
          : (word[`${langID}_strength`] = 0.5);
      } else {
        // creates a new word object, if the word doesn't exists on userDoc (yet)
        coursePath.push({ id, [`${langID}_strength`]: 0.5 });
      }
      updateWordInFirestore(coursePath, userDoc.uid, courseID);
    } else {
      if (word) {
        word[`${langID}_strength`] && word[`${langID}_strength`] > 0
          ? (word[`${langID}_strength`] -= 0.5)
          : word[`${langID}_strength`] || (word[`${langID}_strength`] = 0);
      }
      updateWordInFirestore(coursePath, userDoc.uid, courseID);
    }
  };

  const updateWordInFirestore = (path, uid, courseID) => {
    switch (courseID) {
      case 150:
        database.users.doc(uid).update({
          "progress.course150": path,
        });
        break;
      case 51100:
        database.users.doc(uid).update({
          "progress.course51100": path,
        });
        break;
      case 101153:
        database.users.doc(uid).update({
          "progress.course101153": path,
        });
        break;
      case 154207:
        database.users.doc(uid).update({
          "progress.course154207": path,
        });
        break;

      default:
        break;
    }
  };

  const values = {
    coursesData,
    userActiveLangs,
    getCoursesData,
    addNewActiveLang,
    getAllLangs,
    getLangDoc,
    getActiveLangs,
    updateWords,
  };
  return (
    <LangsContext.Provider value={values}>{children}</LangsContext.Provider>
  );
};
