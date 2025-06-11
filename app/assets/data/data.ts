import cardsJson from "./cards.json";
import type { Card, CardType } from "#app/utils/types";

let cachedCards: Card[] | null = null;

export function getCards(): Card[] {
  if (cachedCards) {
    return cachedCards;
  }
  
  cachedCards = cardsJson.map((card, index) => ({
    id: index + 1,
    ...card,
    cardType: card.cardType as CardType,
  }));
  
  return cachedCards;
}

export function getCardById(id: number): Card {
  const cards = getCards();
  return cards[id - 1];
}
