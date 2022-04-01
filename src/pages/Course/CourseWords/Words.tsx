import { orderBy } from "lodash";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "../../../customHooks/useForm";
import Input from "../../../components/Input";
import { useAuth } from "../../../contexts/AuthContext";
import WordRow from "./WordRow";
import { useEffect, useState } from "react";
import {
  ArrowDownIcon,
  ArrowLeftCircleIcon,
  ArrowUpIcon,
  SearchIcon,
} from "../../../assets/icons/Icons";
import {
  findCorrectTranslation,
  searchWords,
} from "../../../utils/wordsPageUtils";

enum Sort {
  asc,
  desc,
  default,
}

const Words = () => {
  // Hooks
  const [values, handleChange] = useForm({ search: "" });
  const { currentUserDoc } = useAuth();
  const { state } = useLocation();
  const {
    langID,
    courseID,
    langTitle,
    wordsData,
    courseName,
    wordsRange,
    inPrecentProgress,
  } = state as WordsLocationState;

  // States
  const [filteredValues, setFilteredValues] = useState<Word[]>([]);
  const [sortOrder, setSortOrder] = useState<Sort>(Sort.default);

  // sets the sort to default when search value is empty to prevent bugs.
  useEffect(() => {
    if (!currentUserDoc) return;
    if (!values.search) {
      setSortOrder(Sort.default);
      setFilteredValues(wordsData);
      return;
    }

    setFilteredValues(
      searchWords(currentUserDoc, values.search, wordsData, langID, courseID)
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserDoc, values.search]);

  // No Results
  const noResults = filteredValues.length === 0;

  // Handle Sorting: asc -> desc -> default -> repeat
  const handleSort = () => {
    if (sortOrder === Sort.asc) {
      setFilteredValues(orderBy(filteredValues, ["en"], ["desc"]));
      setSortOrder(Sort.desc);
    } else if (sortOrder === Sort.desc) {
      setFilteredValues(orderBy(filteredValues, ["id"]));
      setSortOrder(Sort.default);
    } else if (sortOrder === Sort.default) {
      setFilteredValues(orderBy(filteredValues, ["en"], ["asc"]));
      setSortOrder(Sort.asc);
    }
  };

  return (
    <div>
      {/* Back Button */}
      <Link to="/" className="mt-5 ml-5 flex items-center">
        <ArrowLeftCircleIcon className="stroke-current w-8 h-8 pointer-events-none" />
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
          <hr className="opacity-40 bg-[#BCBCBC] drop-shadow-sm rounded-full h-28 w-[1px] mx-8" />
          <div className="flex flex-col mt-4 justify-center items-center w-2/5 text-center ">
            <h4>
              <span className="font-medium text-2xl">{wordsRange}</span>
              <br />
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
          startIcon={
            <SearchIcon className="flex-none stroke-current mr-2 w-6 h-6" />
          }
        />
        <div className="flex items-center text-general-base mt-6 mb-2 font-light">
          <div className="flex-grow">
            <button
              id="byWord"
              onClick={handleSort}
              className=" text-xl flex justify-start items-center"
            >
              Words
              {sortOrder === Sort.asc && (
                <ArrowUpIcon className="ml-2 stroke-[3px] stroke-current w-6 h-6 pointer-events-none" />
              )}
              {sortOrder === Sort.desc && (
                <ArrowDownIcon className="ml-2 stroke-[3px] stroke-current w-6 h-6 pointer-events-none" />
              )}
            </button>
          </div>
          <div className="pl-5 w-1/4 text-xl">Level</div>
        </div>
        {!noResults ? (
          filteredValues.map(({ id, en, translations }) => (
            <WordRow
              key={id}
              wordID={id}
              langID={langID}
              wordEN={en}
              wordTranslation={findCorrectTranslation(translations, langID)}
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
