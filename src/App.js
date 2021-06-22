import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { LangsProvider } from "./contexts/LangsContext";
import PrivateRoute, { PrivateCourseRoute } from "./components/PrivateRoute";
import Home from "./components/Home";
import Main from "./components/Main";
import AddNewLanguage from "./components/AddNewLanguage/AddNewLanguage";
import Profile from "./components/Profile/Profile";
import Quiz from "./components/Course/Quiz/Quiz";
import Flashcards from "./components/Course/Flashcards";
import Words from "./components/Course/CourseWords/Words";
import SignIn from "./components/Auth/SignIn";
import Signup from "./components/Auth/Signup";
import NotFound from "./components/NotFound";
import FirestoreFileTransfer from "./utils/FirestoreFileTransfer";

function App() {
  return (
    <Router>
      <AuthProvider>
        <LangsProvider>
          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/main" component={Main} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateCourseRoute
              path="/:lang/:courseID/session/quiz"
              component={Quiz}
            />
            <PrivateCourseRoute
              path="/:lang/:courseID/session/flashcards"
              component={Flashcards}
            />
            <PrivateCourseRoute
              path="/:lang/:courseID/words"
              component={Words}
            />
            <PrivateRoute path="/addlanguage" component={AddNewLanguage} />
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={SignIn} />
            <Route path="/firestore" component={FirestoreFileTransfer} />
            <Route path="/" component={NotFound} />
          </Switch>
        </LangsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
