export type CardEffectType = {
  cardId: number;
  effectId: number;
  position: number;
};

type CardEffectDBType = {
  card_id: number;
  effect_id: number;
  position: number;
};

export const CardFromDb = ({
  card_id,
  effect_id,
  ...dbCardEffect
}: CardEffectDBType) => {
  return CardEffect({
    ...dbCardEffect,
    cardId: card_id,
    effectId: effect_id,
  });
};

const CardEffect = ({
  cardId = 0,
  effectId = 0,
  position = 0,
}: Partial<CardEffectType>) => {
  return {
    cardId,
    effectId,
    position,
  };
};

export default CardEffect;
