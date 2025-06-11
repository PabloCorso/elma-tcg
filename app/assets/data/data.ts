import cardsJson from "./cards.json";
import type { Card, CardType } from "#app/utils/types";

export function getCards(): Card[] {
  return cardsJson.map((card, index) => ({
    id: index + 1,
    ...card,
    cardType: card.cardType as CardType,
  }));
}

export function getCardById(id: number): Card {
  const cards = getCards();
  return cards[id - 1];
}
