import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CardType } from "../../../../../server/models/card";
import { CardsList } from "..";
import { apiCards } from "../../../api";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { paths } from "../../../utils";
import "./home.css";

const Home = () => {
  const [cards, setCards] = useState<CardType[]>([]);

  useEffect(() => {
    const getCards = async () => {
      const response = await apiCards.getAll();
      setCards(response);
    };

    getCards();
  }, []);

  return (
    <section>
      <CardsList cards={cards || []} />
      <Link to={paths.newCard}>
        <Fab
          className="fab-add"
          classes={{ root: "fab-add" }}
          color="primary"
          aria-label="add"
          onClick={() => {}}
        >
          <AddIcon />
        </Fab>
      </Link>
    </section>
  );
};

export default Home;
