import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Menu from "../Menu";
import Button from "../Button";
import "./Profile.css";

const Profile = () => {
  const { currentUserDoc, logout, updateSettings } = useAuth();
  const { history } = useHistory();
  const [error, setError] = useState("");

  const [isSound, setIsSound] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState(false);
  const [loader, setLoader] = useState("");

  const [msgOpacity, setMsgOpacity] = useState(0);
  useEffect(() => {
    if (Object.entries(currentUserDoc).length === 0) return; // making sure currentUserDoc loads.
    setIsSound(currentUserDoc.soundEffects);
  }, [currentUserDoc]);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/signin");
    } catch {
      setError("Failed to log out");
    }
  }

  const handleSoundEffect = async (isChecked) => {
    setIsSound(isChecked);
    try {
      await updateSettings("sound", isChecked, currentUserDoc.uid);
      displayUpdateMsg();
    } catch {
      setError("Failed to update setting");
    }
  };

  const displayUpdateMsg = () => {
    setConfirmMsg(true);
    setTimeout(() => {
      setMsgOpacity(100);
    }, 1);
    setTimeout(() => {
      setMsgOpacity(0);
      setTimeout(() => {
        setConfirmMsg(false);
      }, 350);
    }, 2000);
  };

  return (
    <div className="my-10 fixed inset-0 flex flex-col items-center justify-center">
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
      {error && <p className="text-wrong-base">{error}</p>}
      <div className="w-3/5">
        <Button variant="generalOrange" onClickHandle={handleLogout}>
          Logout
        </Button>
      </div>
      <hr className="my-5 bg-[#BCBCBC] opacity-40 w-3/5" />
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
      <Menu currentPage="profile" />
    </div>
  );
};

export default Profile;
