import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router";
import { useAuth } from "../contexts/AuthContext";

// a router to check if there's a current user, if not then redirect the user to the sign in page.
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        );
      }}
    ></Route>
  );
};

export default PrivateRoute;

export const PrivateCourseRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return rest.location.state !== undefined ? (
          <Component {...props} />
        ) : (
          <Redirect to="/main" />
        );
      }}
    ></Route>
  );
};
