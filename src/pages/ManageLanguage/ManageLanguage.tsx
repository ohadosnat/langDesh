import { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import { useAuth } from "../../contexts/AuthContext";
import {
  deleteLanguage,
  resetLanguageCoursesProgress,
} from "../../utils/langs";
import { ArrowLeftCircleIcon } from "../../assets/icons/Icons";
import LanguageSelectCard from "../AddNewLanguage/LanguageSelectCard";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { useLangs } from "../../contexts/LangsContext";
import Toast from "../../components/Toast";

export default function ManageLanguages() {
  const { currentUserDoc, getUserDoc } = useAuth();
  const { userActiveLangs, getActiveLangs } = useLangs();

  const [selectedLanguage, setselectedLanguage] = useState<langsID | null>(
    null
  );
  const [confirmMsg, setConfirmMsg] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>("");
  const [msgOpacity, setMsgOpacity] = useState<number>(0);

  const [actionInProgress, setactionInProgress] = useState<boolean>(false);

  useEffect(() => {
    if (!currentUserDoc) return;
    getActiveLangs(currentUserDoc.activeLangs);
  }, [currentUserDoc]);

  const handleFormOnChange = (e: React.FormEvent<HTMLFormElement>) => {
    setselectedLanguage((e.target as HTMLInputElement).id as langsID);
  };

  const handleResetCourse = async () => {
    if (!currentUserDoc || !selectedLanguage) return;
    setactionInProgress(true);
    await resetLanguageCoursesProgress(selectedLanguage, currentUserDoc);
    displayUpdateMsg("Reset Completed Successfully!");
    setactionInProgress(false);
  };

  const handleDeleteLanguage = async () => {
    if (!currentUserDoc || !selectedLanguage) return;
    console.log("Handle Delete language on", selectedLanguage);
    setactionInProgress(true);
    await deleteLanguage(selectedLanguage, currentUserDoc);
    displayUpdateMsg("Language Deleted Successfully!");
    setactionInProgress(false);
    await getUserDoc(currentUserDoc.uid);
  };

  // update message
  const displayUpdateMsg = (message: string) => {
    setToastMsg(message);
    setConfirmMsg(true);
    setTimeout(() => setMsgOpacity(100), 1);
    setTimeout(() => {
      setMsgOpacity(0);
      setTimeout(() => setConfirmMsg(false), 350);
    }, 2000);
  };

  return (
    <div className="relative flex h-screen justify-center">
      {confirmMsg && <Toast message={toastMsg} opacity={msgOpacity} />}
      <Link
        to="/profile"
        className="text-black fixed top-9 left-9 z-50 hover:text-generalOrange-base global-transition"
      >
        <ArrowLeftCircleIcon className="stroke-current w-8 h-8 pointer-events-none" />
      </Link>
      <Menu currentPage="profile" />
      <div className="flex flex-col justify-center items-center relative w-3/5">
        <h1 className="text-2xl font-medium border-b-2 border-black border-opacity-[15%] drop-shadow-sm pb-2 mb-5">
          Manage Languages
        </h1>
        {userActiveLangs ? (
          <form onChange={handleFormOnChange}>
            <div className="grid grid-flow-col grid-rows-2 gap-4 mb-4">
              {userActiveLangs.map(({ id, name, flagPath }) => (
                <LanguageSelectCard
                  key={id}
                  langName={name}
                  id={id}
                  flagPath={flagPath}
                  isDisabled={false}
                />
              ))}
            </div>
          </form>
        ) : (
          <p>Loading Languages...</p>
        )}
        {selectedLanguage && (
          <>
            <hr className="my-5 bg-[#BCBCBC] opacity-40 w-3/5 lg:w-2/5 xl:w-1/5" />
            <div className="flex flex-col gap-2  w-3/5 lg:mx-auto lg:w-2/5 2xl:w-1/5">
              <Button
                onClickHandle={handleResetCourse}
                isDisabled={actionInProgress}
                variant={actionInProgress ? "disabled" : "generalOrange"}
              >
                Reset Courses
              </Button>
              <Button
                onClickHandle={handleDeleteLanguage}
                isDisabled={actionInProgress}
                variant={actionInProgress ? "disabled" : "wrong"}
                textColor="text-white"
              >
                Delete Language
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
