import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";

const Home = () => {
  const { currentUser, currentUserDoc, logout } = useAuth();

  return (
    <>
      <div className="m-5 space-y-5 w-4/5 mx-auto">
        <h1 className="text-4xl mb-10 text-center">Home</h1>
        <hr /> <br />
        <Link to="/main">
          <Button variant="default">User Dashboard</Button>
        </Link>
        <hr /> <br />
        <Link to="/signup">
          <Button variant="default">Sign up</Button>
        </Link>
        <hr /> <br />
        <Link to="/signin">
          <Button variant="default">Log in</Button>
        </Link>
        <hr /> <br />
        <Link to="/404">
          <Button variant="default">404 Page</Button>
        </Link>
        <hr /> <br />
        {currentUserDoc && (
          <h1 className="capitalize">Welcome back, {currentUserDoc.name}</h1>
        )}
        {currentUser && (
          <button className="text-general-dark" onClick={() => logout()}>
            Logout
          </button>
        )}
        {/* {error && <p className="text-wrong-base">{error}</p>} */}
      </div>
    </>
  );
};

export default Home;
