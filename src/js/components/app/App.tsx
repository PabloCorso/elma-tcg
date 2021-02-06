import React, { useEffect, useState } from "react";
import { SortEnd } from "react-sortable-hoc";
import arrayMove from "array-move";
import { CardType } from "../../../../server/models/card";
import { Button } from "../atoms";
import { CreateCard, CardsList } from "../organisms";
import { apiCards } from "../../api";

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
    <div>
      <CreateCard />
      <Button>Create</Button>
      <CardsList cards={cards} onSortEnd={onSortEnd} />
    </div>
  );
};

export default App;
