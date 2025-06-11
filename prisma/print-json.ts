import cardsList from "#app/assets/data/cards-list.json";
import effectsList from "#app/assets/data/effects-list.json";
import cardsEffectsList from "#app/assets/data/cards-effects-list.json";
import fs from "fs";

// Print cards list with their effects as a json file
const cardsWithEffects = cardsList.cards.map((card) => {
  return {
    name: card.name,
    cardType: card.cardType,
    type1: card.type1,
    type2: card.type2,
    pr1: card.pr1,
    pr2: card.pr2,
    pr3: card.pr3,
    pr4: card.pr4,
    pr5: card.pr5,
    pr6: card.pr6,
    battleLengthMin: card.battleLengthMin,
    battleLengthMax: card.battleLengthMax,
    flavorText: card.flavorText,
    rarity: card.rarity,
    effects: cardsEffectsList.cardsEffects
      .filter((effect) => effect.cardId === card.id)
      .map((effect) => {
        const cardEffect = effectsList.effects.find(
          (e) => e.id === effect.effectId
        );
        // Removing id and name from the effect
        return {
          text: cardEffect?.text,
          italicText: cardEffect?.italicText,
        };
      }),
  };
});

console.log(JSON.stringify(cardsWithEffects, null, 2));

// Write to file in data folder
fs.writeFileSync(
  "app/assets/data/cards-with-effects.json",
  JSON.stringify(cardsWithEffects, null, 2)
);
