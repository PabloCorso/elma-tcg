import React, { useEffect, useState } from "react";
import { CardType } from "server/models/card";
import { Button } from "../atoms";
import { CreateCard, CardsList } from "../organisms";

const App = () => {
  const [cards, setCards] = useState<CardType[]>([]);

  useEffect(() => {
    const getCards = async () => {
      const response = await fetch("/api/v1.0/cards", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      const cards: CardType[] = await response.json();
      setCards(cards);
    };

    getCards();
  }, []);
  return (
    <div>
      <CreateCard />
      <Button>Create</Button>
      <CardsList cards={cards} />
    </div>
  );
};

export default App;
