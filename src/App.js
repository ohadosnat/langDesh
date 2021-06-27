import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { LangsProvider } from "./contexts/LangsContext";
import PrivateRoute, { PrivateCourseRoute } from "./components/PrivateRoute";

// Pages
import Main from "./pages/Main";
import AddNewLanguage from "./pages/AddNewLanguage/AddNewLanguage";
import Profile from "./pages/Profile/Profile";
import About from "./pages/About";
import Quiz from "./pages/Course/Quiz/Quiz";
import Flashcards from "./pages/Course/Flashcards";
import Words from "./pages/Course/CourseWords/Words";
import SignIn from "./pages/Auth/SignIn";
import Signup from "./pages/Auth/Signup";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <AuthProvider>
        <LangsProvider>
          <Switch>
            <PrivateRoute path="/" exact component={Main} />
            <PrivateRoute path="/profile" exact component={Profile} />
            <PrivateRoute path="/about" exact component={About} />
            <PrivateCourseRoute
              path="/:lang/:courseID/session/quiz"
              component={Quiz}
              exact
            />
            <PrivateCourseRoute
              path="/:lang/:courseID/session/flashcards"
              component={Flashcards}
              exact
            />
            <PrivateCourseRoute
              path="/:lang/:courseID/words"
              component={Words}
              exact
            />
            <PrivateRoute
              path="/addlanguage"
              exact
              component={AddNewLanguage}
            />
            <Route path="/signup" exact component={Signup} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/" component={NotFound} />
          </Switch>
        </LangsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
