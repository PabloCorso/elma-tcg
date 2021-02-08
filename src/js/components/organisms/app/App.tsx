import React, { useEffect, useState } from "react";
import { SortEnd } from "react-sortable-hoc";
import arrayMove from "array-move";
import { CardType } from "../../../../../server/models/card";
import { CreateCard, CardsList } from "..";
import { apiCards } from "../../../api";
import "./app.css";

const App = () => {
  const [cards, setCards] = useState<CardType[]>([]);

  useEffect(() => {
    const getCards = async () => {
      const response = await apiCards.getAll();
      const cards: CardType[] = await response.json();
      setCards(cards);
    };

    getCards();
  }, []);

  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    setCards((state) => arrayMove(state, oldIndex, newIndex));
  };

  return (
    <main className="main">
      <section className="create-card-section">
        <CreateCard
          createCard={() => {
            console.log("create card");
          }}
        />
      </section>
      <section>
        <CardsList cards={cards} onSortEnd={onSortEnd} />
      </section>
    </main>
  );
};

export default App;
