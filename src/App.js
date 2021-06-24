import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { LangsProvider } from "./contexts/LangsContext";
import PrivateRoute, { PrivateCourseRoute } from "./components/PrivateRoute";

// Pages
import Main from "./components/Main";
import AddNewLanguage from "./components/AddNewLanguage/AddNewLanguage";
import Profile from "./components/Profile/Profile";
import About from "./components/About";
import Quiz from "./components/Course/Quiz/Quiz";
import Flashcards from "./components/Course/Flashcards";
import Words from "./components/Course/CourseWords/Words";
import SignIn from "./components/Auth/SignIn";
import Signup from "./components/Auth/Signup";
import NotFound from "./components/NotFound";

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
