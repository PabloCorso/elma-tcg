import cardsJson from "./cards.json";
import type { Card, CardType, Rarity } from "#app/utils/types";

let cachedCards: Card[] | null = null;

export function getCards(): Card[] {
  if (cachedCards) {
    return cachedCards;
  }

  cachedCards = cardsJson.map((card, index) => ({
    id: index + 1,
    ...card,
    cardType: card.cardType as CardType,
    rarity: card.rarity as Rarity,
  }));

  return cachedCards;
}

export function getCardById(id: number): Card {
  const cards = getCards();
  return cards[id - 1];
}
