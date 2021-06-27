import _ from "lodash";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "../../../customHooks/useForm";
import Input from "../../../components/Input";
import { useAuth } from "../../../contexts/AuthContext";
import WordRow from "./WordRow";
import { useEffect, useState } from "react";

// Finds the correct translation for a word based on the current lang.
const findCorrectTranslation = (word, langID) => {
  return word.translations.find((translate) => translate.lang === langID);
};
const Words = () => {
  // Hooks & Deconstruct Values.
  const [filteredValues, setFilteredValues] = useState([]);
  const [isDesc, setIsDesc] = useState(false);
  const [values, handleChange] = useForm({ search: "" });
  const { currentUserDoc } = useAuth();
  const { state } = useLocation();

  const {
    langTitle,
    courseName,
    wordsRange,
    wordsData,
    inPrecentProgress,
    langID,
    courseID,
  } = state;
  // sets the sort to default when search value is empty to prevent bugs.
  useEffect(() => {
    if (values.search === "") setIsDesc(false);
    setFilteredValues(filterWords());
  }, [values.search]);

  // filtering by word/translation/level
  const filterWords = () => {
    return wordsData.filter((word) => {
      const userDocWordRef =
        values.search !== "" &&
        currentUserDoc.progress[`course${courseID}`].find(
          (word) => word[`${langID}_strength`] === parseInt(values.search)
        );
      const wordRefID = userDocWordRef !== undefined && userDocWordRef.id;
      return (
        word.en
          .toLocaleLowerCase()
          .includes(values.search.toLocaleLowerCase()) ||
        word.translations
          .find((wordTranslation) => wordTranslation.lang === langID)
          .translation.toLocaleLowerCase()
          .includes(values.search.toLocaleLowerCase()) ||
        word.id.toString().includes(wordRefID)
      );
    });
  };

  // No Results
  const noResults = filteredValues.length === 0;

  // Handle Sorting: false - asc | true - desc
  const handleSort = () => {
    if (!isDesc) setFilteredValues(_.orderBy(filteredValues, ["en"], ["desc"]));
    if (isDesc) setFilteredValues(_.orderBy(filteredValues, ["en"], ["asc"]));
    setIsDesc(!isDesc);
  };

  return (
    <div>
      {/* Back Button */}
      <Link to="/" className="mt-5 ml-5 flex items-center">
        <svg
          className="stroke-current w-8 h-8 pointer-events-none"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
            stroke="black"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <path
            d="M15.2426 20.2426L11 16L15.2426 11.7574"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11 16H21"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h4 className="ml-1 font-medium text-xl">
          {langTitle} - {courseName}
        </h4>
      </Link>
      <div className=" w-10/12 mx-auto mt-10 lg:mx-auto lg:w-3/5 2xl:w-2/5">
        {/* Top Section */}
        <section className="max-w-max mx-auto flex items-center mb-8">
          <img
            src={`/assets/imgs/courses/${langID}-course${courseID}.png`}
            alt=""
            className="h-36 mx-auto"
          />
          <hr className="opacity-40 bg-[#BCBCBC] drop-shadow-sm rounded-full h-28 w-[1px] mx-8 " />
          <div className="flex flex-col mt-4 justify-center items-center w-2/5 text-center ">
            <h4>
              <span className="font-medium text-2xl">{wordsRange}</span> <br />
              <span className="font-light text-sm">Words</span>
            </h4>
            <hr className="h-[1px] w-1/5 my-2 opacity-40 bg-[#BCBCBC] drop-shadow-sm" />
            <div>
              <div className="font-medium text-2xl text-general-base">
                {inPrecentProgress}%
              </div>
              <div className="font-light text-sm">Completed</div>
            </div>
          </div>
        </section>
        <Input
          type="search"
          placeholder="Filter Words"
          value={values.search}
          onChangeValue={handleChange}
        />
        <div className="flex items-center text-general-base mt-6 mb-2 font-light">
          <div className="flex-grow">
            <button
              id="byWord"
              onClick={handleSort}
              className=" text-xl flex justify-start items-center"
            >
              Words
              {isDesc ? (
                <svg
                  className="ml-2 stroke-[3px] stroke-current w-6 h-6 pointer-events-none"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 20L16 10L26 20"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  className="ml-2 stroke-[3px] stroke-current w-6 h-6 pointer-events-none"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26 12L16 22L6 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="pl-5 w-1/4 text-xl">Level</div>
        </div>
        {!noResults ? (
          filteredValues.map((word) => (
            <WordRow
              key={word.id}
              wordID={word.id}
              langID={langID}
              wordEN={word.en}
              wordTranslation={findCorrectTranslation(word, langID)}
              courseID={courseID}
              currentUserDoc={currentUserDoc}
            />
          ))
        ) : (
          <p>Can't find {values.search}</p>
        )}
      </div>
    </div>
  );
};

export default Words;
