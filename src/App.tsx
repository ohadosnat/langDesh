import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { LangsProvider } from "./contexts/LangsContext";
import PrivateRoute, {
  PrivateAuthRoute,
  PrivateCourseRoute,
} from "./components/PrivateRoute";

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
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Main />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/about"
              element={
                <PrivateRoute>
                  <About />
                </PrivateRoute>
              }
            />
            <Route
              path="/:lang/:courseID/session/quiz"
              element={
                <PrivateCourseRoute>
                  <Quiz />
                </PrivateCourseRoute>
              }
            />
            <Route
              path="/:lang/:courseID/session/flashcards"
              element={
                <PrivateCourseRoute>
                  <Flashcards />
                </PrivateCourseRoute>
              }
            />
            <Route
              path="/:lang/:courseID/words"
              element={
                <PrivateCourseRoute>
                  <Words />
                </PrivateCourseRoute>
              }
            />
            <Route
              path="/addlanguage"
              element={
                <PrivateRoute>
                  <AddNewLanguage />
                </PrivateRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PrivateAuthRoute>
                  <Signup />
                </PrivateAuthRoute>
              }
            />
            <Route
              path="/signin"
              element={
                <PrivateAuthRoute>
                  <SignIn />
                </PrivateAuthRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LangsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
