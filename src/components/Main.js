import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { LangsProvider } from "../contexts/LangsContext";
import Dashboard from "./Dashboard/Dashboard";

const Main = () => {
  const { currentUserDoc } = useAuth();

  return (
    <div>
      <LangsProvider>
        {Object.entries(currentUserDoc).length === 0 || <Dashboard />}
      </LangsProvider>
    </div>
  );
};

export default Main;
