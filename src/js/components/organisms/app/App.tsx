import React, { useEffect, useState } from "react";
import { SortEnd } from "react-sortable-hoc";
import arrayMove from "array-move";
import { CardType } from "../../../../../server/models/card";
import { CreateCard, CardsList } from "..";
import { apiCards } from "../../../api";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import "./app.css";

const App = () => {
  const [isOnCardCreation, setIsOnCardCreation] = useState(false);

  const [cards, setCards] = useState<CardType[]>([]);

  useEffect(() => {
    const getCards = async () => {
      const response = await apiCards.getAll();
      setCards(response);
    };

    getCards();
  }, []);

  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    setCards((state) => arrayMove(state, oldIndex, newIndex));
  };

  const createCard = async (card: CardType) => {
    return apiCards.create(card);
  };

  return (
    <main className="main">
      {!isOnCardCreation && (
        <section>
          <CardsList cards={cards || []} onSortEnd={onSortEnd} />
          <Fab
            className="fab-add"
            classes={{ root: "fab-add" }}
            color="primary"
            aria-label="add"
            onClick={() => {
              setIsOnCardCreation(true);
            }}
          >
            <AddIcon />
          </Fab>
        </section>
      )}
      {isOnCardCreation && (
        <section className="create-card-section">
          <CreateCard createCard={createCard} />
        </section>
      )}
    </main>
  );
};

export default App;
