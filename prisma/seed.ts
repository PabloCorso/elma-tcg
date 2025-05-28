import { prisma } from "#app/utils/db.server";
import cardsList from "#app/data/cards-list.json";
import effectsList from "#app/data/effects-list.json";
import cardsEffectsList from "#app/data/cards-effects-list.json";

console.info("🌱 Seeding...");
console.time(`🌱 Database has been seeded`);

// 1. Seed cards
await prisma.card.createMany({
  data: cardsList.cards.map((card) => ({
    id: card.id,
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
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
});

// 2. Seed effects
await prisma.effect.createMany({
  data: effectsList.effects.map((effect) => ({
    id: effect.id,
    name: effect.name,
    text: effect.text,
    italicText: effect.italicText,
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
});

// 3. Seed card-effect relationships
for (const { cardId, effectId } of cardsEffectsList.cardsEffects) {
  await prisma.card.update({
    where: { id: cardId },
    data: {
      effects: {
        connect: { id: effectId },
      },
    },
  });
}

console.timeEnd(`🌱 Database has been seeded`);
