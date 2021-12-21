import "./AddNewLanguage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LanguageSelectCard from "./LanguageSelectCard";
import Button from "../../components/Button";
import { addNewActiveLang, getAllLangs } from "../../utils/langs";
import { isChecked } from "../../utils/isChecked";
import { ArrowLeftCircleIcon } from "../../assets/icons/Icons";

const AddNewLanguage = () => {
  // Custom Hooks
  const navigate = useNavigate();
  const { currentUser, currentUserDoc, getUserDoc } = useAuth();

  // States
  const [availableLanguages, setAvailableLanguages] = useState<
    Formatted.LanguageDoc[]
  >([]);

  // Form Submit Handle
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const checkedValue = isChecked(e);
    await addNewActiveLang(currentUser.uid, checkedValue as langsID);
    await getUserDoc(currentUser.uid);
    navigate("/");
  };

  // Load Available Languages
  useEffect(() => {
    (async () => {
      const langs = await getAllLangs();
      langs && setAvailableLanguages(langs);
    })();
  }, []);

  return (
    <div className="relative flex h-screen justify-center">
      <button
        className="mt-5 ml-5 flex items-center fixed top-0 left-0"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftCircleIcon className="stroke-current w-8 h-8 pointer-events-none" />
        <h4 className="ml-1 font-medium text-xl">Back</h4>
      </button>
      <div className="flex flex-col justify-center items-center relative w-3/5">
        <h1 className="text-2xl font-medium border-b-2 border-black border-opacity-[15%] drop-shadow-sm pb-2 mb-5">
          Select a Langauge
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-flow-col grid-rows-2 gap-4 mb-4">
            {availableLanguages.map(({ id, name, flagPath }) => (
              <LanguageSelectCard
                key={id}
                langName={name}
                id={id}
                flagPath={flagPath}
                isDisabled={currentUserDoc!.activeLangs.includes(id)}
              />
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-9 lg:w-3/5 lg:mx-auto 2xl:w-2/5">
            <Button variant="general" textColor="text-white">
              Add Langauge
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewLanguage;
