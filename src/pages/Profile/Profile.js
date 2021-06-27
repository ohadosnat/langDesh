import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Menu from "../../components/Menu";
import Button from "../../components/Button";
import "./Profile.css";

const Profile = () => {
  const { currentUserDoc, logout, updateSettings } = useAuth();
  const { history } = useHistory();
  const [error, setError] = useState("");

  const [isSound, setIsSound] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState(false);

  const [msgOpacity, setMsgOpacity] = useState(0);
  useEffect(() => {
    if (
      currentUserDoc !== undefined &&
      Object.entries(currentUserDoc).length === 0
    )
      return; // making sure currentUserDoc loads.
    if (currentUserDoc) setIsSound(currentUserDoc.soundEffects);
  }, [currentUserDoc]);

  // user logout
  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/signin");
    } catch {
      setError("Failed to log out");
    }
  }

  // turn on/off sound effect
  const handleSoundEffect = async (isChecked) => {
    setIsSound(isChecked);
    try {
      await updateSettings("sound", isChecked, currentUserDoc.uid);
      displayUpdateMsg();
    } catch {
      setError("Failed to update setting");
    }
  };

  // update message
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
        <Button variant="generalOrange" onClickHandle={handleLogout}>
          Logout
        </Button>
      </div>
      {error && <p className="text-wrong-base">{error}</p>}
      <Link
        to="/about"
        className="global-transition flex flex-col justify-center items-center fixed top-10 right-10 hover:text-generalOrange-base lg:bottom-10 lg:top-auto lg:right-auto"
      >
        <svg
          className="stroke-current w-8 h-8 pointer-events-none"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 20C18.7614 20 21 17.7614 21 15C21 12.2386 18.7614 10 16 10C13.2386 10 11 12.2386 11 15C11 17.7614 13.2386 20 16 20Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M26 5H6C5.44772 5 5 5.44772 5 6V26C5 26.5523 5.44772 27 6 27H26C26.5523 27 27 26.5523 27 26V6C27 5.44772 26.5523 5 26 5Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.22314 27C7.67684 25.0115 8.7923 23.236 10.3869 21.9643C11.9814 20.6926 13.9605 20 16.0001 20C18.0397 20 20.0188 20.6926 21.6134 21.9643C23.2079 23.236 24.3234 25.0115 24.7771 27"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        About
      </Link>
      <Menu currentPage="profile" />
    </div>
  );
};

export default Profile;
