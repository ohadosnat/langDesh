import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import { Signup } from "./components/Auth/Signup";
import SignIn from "./components/Auth/SignIn";
import { AuthProvider } from "./contexts/AuthContext";
import { LangsProvider } from "./contexts/LangsContext";
import Main from "./components/Main";
import PrivateRoute from "./components/PrivateRoute";
import Quiz from "./components/Quiz";
import Flashcards from "./components/Flashcards";
import Words from "./components/Course/CourseWords/Words";
import AddNewLanguage from "./components/AddNewLanguage/AddNewLanguage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <LangsProvider>
          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/main" component={Main} />
            <PrivateRoute
              path="/:lang/:courseID/session/quiz"
              component={Quiz}
            />
            <PrivateRoute
              path="/:lang/:courseID/session/flashcards"
              component={Flashcards}
            />
            <PrivateRoute path="/:lang/:courseID/words" component={Words} />
            <PrivateRoute path="/addlanguage" component={AddNewLanguage} />
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={SignIn} />
            <Route path="/" component={NotFound} />
          </Switch>
        </LangsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

/* TEMP COMMENTS - Components and routes.
      <h3 className="text-2xl mb-10 text-center font-medium">Cards</h3>
      <h5>Flashcard Type (can flip)</h5>

      <h3 className="text-2xl mb-10 text-center font-medium">Buttons</h3>
        <Button variant="transparent" textColor="text-wrong-base hover:text-wrong-dark">Transparent</Button>
        <Button variant="correct" >Correct</Button>
        <Button variant="wrong" >Wrong</Button>
        <Button variant="defualt" >Default</Button>
        <Button variant="general" textColor="text-white">General</Button>
        <Button variant="disabled">Disabled</Button>
        <hr />
        <h3 className="text-2xl mb-10 text-center font-medium">Inputs</h3>
        <Input type="quiz" data={undefined} />
        <Input type="search" data={newBooks} />
        <Input type="filter" data={ruWords.course1} lang="ru" />
        <hr />

        <CourseCard baseColor="#824087" />
      <CourseCard baseColor="#6247AE" />
        <CourseCard baseColor="#6247AE" /> 
       <Card type="course" data={undefined} isQuiz={false} />
       <Card type="course" data={challenges[currectChallenges]} /> 
      <Card type="course" /> 


               <Route path="/main" exact component={Main} /> 
         <Route path="/main/:id" component={Course} /> 
         <Route path="/course1/session/:id" component={Session} />

*/
