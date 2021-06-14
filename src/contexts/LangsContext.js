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

  const values = {
    coursesData,
    userActiveLangs,
    getCoursesData,
    addNewActiveLang,
    getAllLangs,
    getLangDoc,
    getActiveLangs,
  };
  return (
    <LangsContext.Provider value={values}>{children}</LangsContext.Provider>
  );
};

// const addWords = async () => {
//   return database.courses.doc("KjKL6vXzE9dbsRJI0HYY").update({
//     words: [
//       {
//         id: "a4fd7810",
//         en: "I",
//         translations: [
//           { lang: "rus", en_pron: "ja", translation: "я" },
//           { lang: "ita", en_pron: "yo", translation: "yo" },
//         ],
//       },
//       {
//         id: "bf5460f8",
//         en: "You",
//         translations: [
//           { lang: "rus", en_pron: "ty", translation: "ты" },
//           { lang: "ita", en_pron: "tu", translation: "tu" },
//         ],
//       },
//     ],
//   });
// };
// addWords();
/* 

words: [
  { id: "a4fd7810", en: "I", translations: [ {lang: "rus", en_pron: "ja", translation: я}, {lang: "ita", en_pron: "yo", translation: yo} ] },
  { id: "bf5460f8", en: "You", translations: [ {lang: "rus", en_pron: "ty", translation: ты}, {lang: "ita", en_pron: "tu", translation: tu} ] }
]

length = 2


course150: [

  {id: "a4fd7810", ita_strength: 0, rus_strength: 5},
  {id: "bf5460f8", ita_strength: 0, rus_strength: 0},
]


// getting the translation for a specific word.
temp2.words.a4fd7810.translations.filter(trans => trans.lang === "rus");

*/
