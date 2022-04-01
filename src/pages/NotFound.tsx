import { useEffect, useRef } from "react";
import Button from "../components/Button";
import sleepingPanda from "../assets/lottie/sleepingPanda.json";
import lottie from "lottie-web";
import { useAuth } from "../contexts/AuthContext";
import { useLocation, useNavigate, useParams } from "react-router";

const NotFound = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { currentUserDoc } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    lottie.loadAnimation({
      name: "sleepingPanda",
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: sleepingPanda,
      rendererSettings: {
        className: "pointer-events-none", // to prevent click event on the svg/path.
      },
    });

    lottie.setSpeed(1.5, "sleepingPanda");
  }, []);

  return (
    <div className="text-center w-full h-screen flex flex-col justify-center items-center lg:w-3/5 2xl:w-2/5 lg:mx-auto">
      <div>
        <div className="h-80 -mb-14" ref={containerRef} />
        <h1 className="font-medium text-xl">
          Oh hey {currentUserDoc && currentUserDoc.name} <br />
        </h1>
        <p className="text-lg">
          we can't find{" "}
          <span className="text-wrong-base">{id || pathname}</span>
        </p>
      </div>
      <div className="w-9/12 mt-5 mb-2 mx-auto" onClick={() => navigate(-1)}>
        <Button variant="generalOrange">Go back</Button>
      </div>
    </div>
  );
};

export default NotFound;
