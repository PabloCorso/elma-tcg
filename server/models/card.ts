import CardEffect, { CardEffectDBType, CardEffectType } from "./cardEffect";

export type CardType = {
  name: string;
  cardType: string;
  type1?: string;
  type2?: string;
  pr1?: number;
  pr2?: number;
  pr3?: number;
  pr4?: number;
  pr5?: number;
  pr6?: number;
  battleLengthMin?: number;
  battleLengthMax?: number;
  setName: string;
  collectorNumber: number;
  effects?: CardEffectType[];
};

type CardDBType = {
  name: string;
  card_type: string;
  type1?: string;
  type2?: string;
  pr1?: number;
  pr2?: number;
  pr3?: number;
  pr4?: number;
  pr5?: number;
  pr6?: number;
  battle_length_min?: number;
  battle_length_max?: number;
  set_name: string;
  collector_number: number;
  effects?: CardEffectType[];
};

const Card = ({
  name,
  card_type,
  type1,
  type2,
  pr1,
  pr2,
  pr3,
  pr4,
  pr5,
  pr6,
  battle_length_min,
  battle_length_max,
  set_name,
  collector_number,
  effects,
}: CardDBType) => {
  return {
    name,
    cardType: card_type,
    type1,
    type2,
    pr1,
    pr2,
    pr3,
    pr4,
    pr5,
    pr6,
    battleLengthMin: battle_length_min,
    battleLengthMax: battle_length_max,
    setName: set_name,
    collectorNumber: collector_number,
    effects: effects || [],
  };
};

export default Card;
