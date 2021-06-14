import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";

const Home = () => {
  const { currentUser, currentUserDoc, logout } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();

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
    <>
      <div className="m-5 space-y-5 w-4/5 mx-auto">
        <h1 className="text-4xl mb-10 text-center">Home</h1>
        <hr /> <br />
        <Link to="/main">
          <Button variant="defualt">User Dashboard</Button>
        </Link>
        <hr /> <br />
        <Link to="/signup">
          <Button variant="defualt">Sign up</Button>
        </Link>
        <hr /> <br />
        <Link to="/signin">
          <Button variant="defualt">Log in</Button>
        </Link>
        <hr /> <br />
        <Link to="/404">
          <Button variant="defualt">404 Page</Button>
        </Link>
        <hr /> <br />
        {currentUserDoc && (
          <h1 className="capitalize">Welcome back, {currentUserDoc.name}</h1>
        )}
        {currentUser && (
          <button className="text-general-dark" onClick={handleLogout}>
            Logout
          </button>
        )}
        {error && <p className="text-wrong-base">{error}</p>}
      </div>
    </>
  );
};

export default Home;
