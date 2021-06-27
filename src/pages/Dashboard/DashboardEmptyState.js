import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

const DashboardEmptyState = ({ Username }) => {
  return (
    <div className="text-center mx-auto absolute inset-0 flex flex-col justify-center items-center">
      <img src="/assets/imgs/utils/newuser.png" className="h-40 mb-5" alt="" />
      <h2 className="text-xl font-medium">
        Welcome {Username}, <br /> You must be new here
      </h2>
      <p className="text-lg mb-5">Press the button below to get started!</p>

      <Link to="/addlanguage" className="w-3/5 mx-auto lg:w-2/5 2xl:w-1/5">
        <Button variant="general" textColor="text-white">
          Add a new language!
        </Button>
      </Link>
    </div>
  );
};

export default DashboardEmptyState;
