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

// updates course
const updateCourses = async (courseID, wordsData) => {
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

  useEffect(() => {
    // updateCourses("KjKL6vXzE9dbsRJI0HYY", coursesWords[150]);
    // updateCourses("kaU98X0ILbDlh0IlWIPt", coursesWords[51100]);
    // updateCourses("12Zoj5lo41YTf46OTxEl", coursesWords[101150]);
    // updateCourses("AKA6JSB8yJC4UU00Ig9j", coursesWords[151207]);
  }, []);
  return (
    <div className="font-medium h-screen w-screen flex justify-center items-center">
      (👉ﾟヮﾟ)👉👈(ﾟヮﾟ👈)
    </div>
  );
}

export default FirestoreFileTransfer;

/*

*/
