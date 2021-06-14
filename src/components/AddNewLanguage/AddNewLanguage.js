import "./AddNewLanguage.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useLangs } from "../../contexts/LangsContext";
import LanguageSelectCard from "./LanguageSelectCard";
import Button from "../Button";

const isChecked = (e) => {
  for (let i = 0; i < e.target.length; i++) {
    if (e.target[i].checked) return e.target[i].id;
  }
};

const isDisabled = (userLang, lang) => {
  return lang.filter((x) => userLang.includes(x.id)).length !== 0
    ? true
    : false;
};

const AddNewLanguage = () => {
  const history = useHistory();
  const { currentUser, currentUserDoc } = useAuth();
  const { addNewActiveLang, getAllLangs } = useLangs();
  const [availableLanguages, setAvailableLanguages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const checkedValue = await isChecked(e);
    await addNewActiveLang(currentUser.uid, checkedValue);
    history.push("/newMain"); // will be "/" or "/dashboard"
  };

  useEffect(() => {
    getAllLangs().then((data) => setAvailableLanguages(data));
  }, []);

  return (
    <div className="relative flex h-screen justify-center">
      <button
        className="mt-5 ml-5 flex items-center fixed top-0 left-0"
        onClick={() => history.goBack()}
      >
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
        <h4 className="ml-1 font-medium text-xl">Back</h4>
      </button>
      <div className="flex flex-col justify-center items-center relative w-3/5">
        <h1 className="text-2xl font-medium border-b-2 border-black border-opacity-[15%] drop-shadow-sm pb-2 mb-5">
          Select a Langauge
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-flow-col grid-rows-2 gap-4 mb-4">
            {availableLanguages.map((lang) => (
              <LanguageSelectCard
                key={lang.id}
                langName={lang.name}
                id={lang.id}
                flagPath={lang.flagPath}
                isDisabled={isDisabled(currentUserDoc.activeLangs, [lang])}
              />
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-9">
            <Button variant="generalOrange">Add Langauge</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewLanguage;

/* 
TODO - Adding new language.
[x] design
[x] fetch and render the langs that can be added
  [x] if a user already added a lang, disable it
[x] the langs should be inside a form and act as a radio buttons.
  [x] figuring out how to style custom radio buttons.
[x] add the langs to the user's current "activeLangs" inside firestore.
  [x] update the currentUserDoc to the most recent.
*/
