import { Navigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";

// a router to check if there's a current user, if not then redirect the user to the sign in page.
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/signin" />;
  return children;
};

export const PrivateAuthRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser } = useAuth();
  if (currentUser) return <Navigate to="/" />;
  return children;
};

export const PrivateCourseRoute = ({ children }: { children: JSX.Element }) => {
  const { state } = useLocation();
  if (!state) return <Navigate to="/" />;
  return children;
};

export default PrivateRoute;
