import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { LangsProvider } from "../contexts/LangsContext";
import Dashboard from "./Dashboard/Dashboard";

const Main = () => {
  const { currentUserDoc } = useAuth();

  return <LangsProvider>{currentUserDoc && <Dashboard />}</LangsProvider>;
};

export default Main;
