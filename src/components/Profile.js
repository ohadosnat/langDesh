import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Menu from "./Menu";
import Button from "./Button";

const Profile = () => {
  const { currentUserDoc, logout } = useAuth();
  const { history } = useHistory();
  const [error, setError] = useState("");

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/signin");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div className="my-10 fixed inset-0 flex flex-col items-center justify-center">
      <h1 className="capitalize font-medium text-2xl mb-4">
        Hello, {currentUserDoc && currentUserDoc.name}
      </h1>
      <div className="w-3/5">
        <Button variant="generalOrange" onClickHandle={handleLogout}>
          Logout
        </Button>
        {error && <p className="text-wrong-base">{error}</p>}
      </div>
      <Menu currentPage="profile" />
    </div>
  );
};

export default Profile;
