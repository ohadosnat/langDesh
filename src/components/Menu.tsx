import { Link } from "react-router-dom";
import {
  ProfileIcon,
  PlusCircleIcon,
  ScholarHatIcon,
} from "../assets/icons/Icons";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  currentPage: "main" | "profile";
}

/**
 * Menu Component
 * @param currentPage - The current page (e.g. `main`)
 */
const Menu = ({ currentPage }: Props) => {
  const { currentUserDoc } = useAuth();

  return (
    <div className="bg-white border-t shadow-sm fixed bottom-0 inset-x-0 py-6 flex items-center justify-evenly lg:absolute lg:w-1/6 lg:right-4 lg:top-11 lg:bottom-auto lg:left-auto lg:border-none lg:shadow-none lg:py-0">
      <Link to="/">
        <ScholarHatIcon
          className={`stroke-current w-8 h-8 ${
            currentPage === "main"
              ? "text-general-base"
              : "hover:text-general-dark"
          }`}
        />
      </Link>
      <hr className="h-6 w-[1px] opacity-40 bg-black" />
      {currentUserDoc && currentUserDoc.activeLangs.length < 4 && (
        <>
          <Link to="/addlanguage">
            <PlusCircleIcon className="stroke-current w-8 h-8 global-transition hover:text-general-dark" />
          </Link>
          <hr className="h-6 w-[1px] opacity-40 bg-black" />
        </>
      )}
      <Link to="/profile">
        <ProfileIcon
          className={`stroke-current w-8 h-8 ${
            currentPage === "profile"
              ? "text-general-base"
              : "hover:text-general-dark"
          }`}
        />
      </Link>
    </div>
  );
};

export default Menu;
