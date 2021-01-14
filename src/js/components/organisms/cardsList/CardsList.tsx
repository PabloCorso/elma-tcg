import React from "react";
import { CardType } from "../../../../../server/models/card";

type Props = {
  cards: CardType[];
};

const CardsList: React.FC<Props> = ({ cards }) => {
  return (
    <ul>
      {cards.map((card) => (
        <li key={card.name}>
          {card.name} - {card.cardType} - {card.setName}
        </li>
      ))}
    </ul>
  );
};

export default CardsList;
