import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Menu from "../../components/Menu";
import Button from "../../components/Button";
import "./Profile.css";
import { AboutIcon } from "../../assets/icons/Icons";

const Profile = () => {
  // Custom Hooks
  const { currentUserDoc, logout, updateSettings } = useAuth();

  // States
  const [error, setError] = useState<string>("");
  const [isSound, setIsSound] = useState<boolean>(false);
  const [confirmMsg, setConfirmMsg] = useState<boolean>(false);
  const [msgOpacity, setMsgOpacity] = useState<number>(0);

  useEffect(() => {
    if (!currentUserDoc) return;
    setIsSound(currentUserDoc.soundEffects);
  }, [currentUserDoc]);

  // turn on/off sound effect
  const handleSoundEffect = async (isChecked: boolean) => {
    setIsSound(isChecked);
    try {
      await updateSettings("sound", isChecked, currentUserDoc!.uid);
      displayUpdateMsg();
    } catch {
      setError("Failed to update setting");
    }
  };

  // update message
  const displayUpdateMsg = () => {
    setConfirmMsg(true);
    setTimeout(() => setMsgOpacity(100), 1);
    setTimeout(() => {
      setMsgOpacity(0);
      setTimeout(() => setConfirmMsg(false), 350);
    }, 2000);
  };

  return (
    <div className="p-6 fixed inset-0 flex flex-col items-center justify-center">
      {confirmMsg && (
        <div
          className="fixed top-5 shadow-sm bg-default-base border border-opacity-25 py-2 px-6 rounded-md global-transition"
          style={{ opacity: `${msgOpacity}%` }}
        >
          Updated!
        </div>
      )}

      <h1 className="capitalize font-medium text-2xl mb-4">
        Hello, {currentUserDoc && currentUserDoc.name}
      </h1>

      <div className="flex items-center">
        <span className="text-xl mr-5">Sound Effects</span>
        <input
          type="checkbox"
          name="soundEffects"
          id="toggle"
          checked={isSound}
          onChange={(e) => handleSoundEffect(e.target.checked)}
        />
        <label htmlFor="toggle"></label>
      </div>
      <hr className="my-5 bg-[#BCBCBC] opacity-40 w-3/5 lg:w-2/5 xl:w-1/5" />
      <div className="w-3/5 lg:mx-auto lg:w-2/5 2xl:w-1/5">
        <Button variant="generalOrange" onClickHandle={() => logout()}>
          Logout
        </Button>
      </div>
      {error && <p className="text-wrong-base">{error}</p>}
      <Link
        to="/about"
        className="global-transition flex flex-col justify-center items-center fixed top-10 right-10 hover:text-generalOrange-base lg:bottom-10 lg:top-auto lg:right-auto"
      >
        <AboutIcon className="stroke-current w-8 h-8 pointer-events-none" />
        About
      </Link>
      <Menu currentPage="profile" />
    </div>
  );
};

export default Profile;
