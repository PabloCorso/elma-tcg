import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { CardType } from "../../../../../server/models/card";
import { CardsList } from "..";
import { apiCards } from "../../../api";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Paths } from "../../../config";
import "./home.css";

const Home = () => {
  const [cards, setCards] = useState<CardType[]>([]);

  const getCards = async () => {
    const response = await apiCards.getAll();
    setCards(response);
  };

  useEffect(() => {
    getCards();
  }, []);

  const history = useHistory();
  const redirectToCardEdit = (cardId: number) => {
    history.push(Paths.editCard(cardId));
  };

  return (
    <section>
      <CardsList
        cards={cards || []}
        onEdit={redirectToCardEdit}
        onDelete={async (cardId) => {
          const success = await apiCards.del(cardId);
          if (success) {
            await getCards();
          } else {
            window.alert(
              `An error ocurred while trying to delete card id: ${cardId}`
            );
          }
        }}
      />
      <Link to={Paths.newCard}>
        <Fab
          className="fab-add"
          classes={{ root: "fab-add" }}
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </Link>
    </section>
  );
};

export default Home;
