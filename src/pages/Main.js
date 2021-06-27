import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { LangsProvider } from "../contexts/LangsContext";
import Dashboard from "../pages/Dashboard/Dashboard";

const Main = () => {
  const { currentUserDoc } = useAuth();

  return (
    <div>
      <LangsProvider>
        {currentUserDoc
          ? Object.entries(currentUserDoc).length === 0 || <Dashboard />
          : undefined}
      </LangsProvider>
    </div>
  );
};

export default Main;
