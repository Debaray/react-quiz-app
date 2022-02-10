import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Login from "./components/Login/Login";
import Main from "./components/Main/Main";
import ManageQuestions from "./components/Admin/ManageQuestions";
import AddQuestions from "./components/Admin/AddQuestions";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import React from "react";
function App() {
  return (
    <React.Fragment>
      <Header />
      <div className="App-header">
        <Router>
          <Switch>
            <PrivateRoute path="/managequestions">
              <ManageQuestions></ManageQuestions>
            </PrivateRoute>
            <Route path="/login">
              <Login></Login>
            </Route>
            <PrivateRoute path="/addquestions">
              <AddQuestions></AddQuestions>
            </PrivateRoute>
            <PrivateRoute path="/editquestions/:id">
              <AddQuestions></AddQuestions>
            </PrivateRoute>
            <PrivateRoute exact path="/">
              <Main></Main>
            </PrivateRoute>
          </Switch>
        </Router>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
