import { EffectType } from "./effect";
import CardTypeEnum from "./cardTypeEnum";
import SetName from "./setName";
import Rarity from "./rarity";

export type CardType = {
  id: number;
  name: string;
  cardType: CardTypeEnum;
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
  flavorText?: string;
  setName?: string;
  collectorNumber?: number;
  effects?: EffectType[];
  rarity?: Rarity;
};

type CardDBType = {
  id: number;
  name: string;
  card_type: CardTypeEnum;
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
  flavor_text: string;
  set_name: string;
  collector_number: number;
  rarity: Rarity;
  effects?: EffectType[];
};

export const CardFromDbCard = ({
  card_type,
  battle_length_min,
  battle_length_max,
  flavor_text,
  set_name,
  collector_number,
  ...dbCard
}: CardDBType) => {
  return Card({
    ...dbCard,
    cardType: card_type,
    battleLengthMin: battle_length_min,
    battleLengthMax: battle_length_max,
    flavorText: flavor_text,
    setName: set_name,
    collectorNumber: collector_number,
  });
};

const Card = ({
  id = 0,
  name = "",
  cardType = CardTypeEnum.KUSKI,
  type1 = "",
  type2 = "",
  pr1,
  pr2,
  pr3,
  pr4,
  pr5,
  pr6,
  battleLengthMin,
  battleLengthMax,
  flavorText = "",
  setName = SetName.ALPHA,
  collectorNumber,
  rarity = Rarity.COMMON,
  effects = [],
}: Partial<CardType>) => {
  return {
    id,
    name,
    cardType,
    type1,
    type2,
    pr1,
    pr2,
    pr3,
    pr4,
    pr5,
    pr6,
    battleLengthMin,
    battleLengthMax,
    flavorText,
    setName,
    collectorNumber,
    rarity,
    effects,
  };
};

export default Card;
