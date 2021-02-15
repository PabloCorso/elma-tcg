import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Paths } from "../../../config";
import Home from "../home";
import CardSaveView from "../cardSaveView";
import "./app.css";

const App = () => {
  return (
    <Router>
      <main className="main">
        <nav className="nav">
          <Link to={Paths.home}>elma-tcg</Link>
        </nav>
        <Switch>
          <Route path={Paths.editCard()}>
            <CardSaveView />
          </Route>
          <Route path={Paths.newCard}>
            <CardSaveView />
          </Route>
          <Route path={Paths.home}>
            <Home />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
