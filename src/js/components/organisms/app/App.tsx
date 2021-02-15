import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { CardType } from "../../../../../server/models";
import { apiCards } from "../../../api";
import { paths } from "../../../utils";
import CreateCard from "../createCard";
import Home from "../home";

import "./app.css";

const App = () => {
  const createCard = async (card: CardType) => {
    return apiCards.create(card);
  };

  return (
    <Router>
      <main className="main">
        <nav className="nav">
          <Link to={paths.home}>elma-tcg</Link>
        </nav>
        <Switch>
          <Route path={paths.newCard}>
            <CreateCard createCard={createCard} />
          </Route>
          <Route path={paths.home}>
            <Home />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
