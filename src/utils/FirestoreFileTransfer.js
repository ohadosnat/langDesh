import { useEffect, useState } from "react";
import { database } from "./firebaseConfig";
import swadeshList from "./swadeshList.json";

// Creates a course.
const initCourses = async (courseName, id, wordsRange) => {
  database.courses
    .add({
      courseName,
      id,
      words: [],
      wordsRange,
    })
    .then((docRef) => {
      console.log("Document successfully updated!");
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

const updateCourses = async (courseID, wordsData) => {
  // console.log(courseID, wordsData);
  database.courses
    .doc(courseID)
    .update({
      words: wordsData,
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

function FirestoreFileTransfer() {
  const [coursesWords, setCoursesWords] = useState({
    150: swadeshList.slice(0, 50),
    51100: swadeshList.slice(50, 100),
    101150: swadeshList.slice(100, 153),
    151207: swadeshList.slice(153),
  });

  useEffect(() => {}, []);
  return (
    <div className="font-medium h-screen w-screen flex justify-center items-center">
      (👉ﾟヮﾟ)👉👈(ﾟヮﾟ👈)
    </div>
  );
}

export default FirestoreFileTransfer;

/*
--
slicing for each course should be (by order):
0,50
51,101
102,152
153
--

const addWords = async () => {
  return database.courses.doc("KjKL6vXzE9dbsRJI0HYY").update({
    words: [
      {
        id: "a4fd7810",
        en: "I",
        translations: [
          { lang: "rus", en_pron: "ja", translation: "я" },
          { lang: "ita", en_pron: "yo", translation: "yo" },
        ],
      },
      {
        id: "bf5460f8",
        en: "You",
        translations: [
          { lang: "rus", en_pron: "ty", translation: "ты" },
          { lang: "ita", en_pron: "tu", translation: "tu" },
        ],
      },
    ],
  });
};
addWords();

*/
