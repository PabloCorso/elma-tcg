import cardsData from "../data/cards.json";
import effectsData from "../data/effects.json";
import cardsEffectsData from "../data/all_cards_effects_positioned.json";
import type { CardType, Rarity } from "#app/utils/types";
import type { Card, Effect } from "@prisma/client";

type CardData = {
  id: number; // "integer",
  name: string; // "text",
  card_type: CardType; // "card_type",
  type1: string; // "text",
  type2: string; // "text",
  pr1: number; // "float",
  pr2: number; // "float",
  pr3: number; // "float",
  pr4: number; // "float",
  pr5: number; // "float",
  pr6: number; // "float",
  battle_length_min: number; // "integer",
  battle_length_max: number; // "integer",
  flavor_text: string; // "text",
  rarity: Rarity; // "rarity",
  deleted: boolean; // "boolean"
  effects: EffectData[];
};

export type EffectData = {
  id: number;
  name: string;
  text: string;
  italic_text: string;
};

export type CardEffectRelation = {
  id: number; // card.id
  effect_id: number;
  position: number;
};

type DataValuesValue = string | boolean | number | null;

type Data = {
  title: string;
  values: Array<DataValuesValue>[];
  fields: string[];
  types: number[];
  type_names: string[];
};

function parseCardData(data: CardData): Card & { effects: Effect[] } {
  return {
    id: data.id,
    name: data.name,
    cardType: data.card_type,
    type1: data.type1,
    type2: data.type2,
    pr1: data.pr1 as any,
    pr2: data.pr2 as any,
    pr3: data.pr3 as any,
    pr4: data.pr4 as any,
    pr5: data.pr5 as any,
    pr6: data.pr6 as any,
    battleLengthMin: data.battle_length_min,
    battleLengthMax: data.battle_length_max,
    flavorText: data.flavor_text,
    rarity: data.rarity,
    deleted: data.deleted,
    createdAt: new Date(),
    updatedAt: new Date(),
    effects: [],
  };
}

function parseEffectData(data: EffectData): Effect {
  return {
    id: data.id,
    name: data.name,
    text: data.text,
    italicText: data.italic_text,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

function parseData<T>(data: Data) {
  const result = data.values.map((dataValue) => {
    const item = {} as any;
    for (let i = 0; i < dataValue.length; i++) {
      const fieldName = data.fields[i];
      const value = dataValue[i];
      item[fieldName] = value;
    }
    return item as T;
  });
  return result;
}

export function getCardsAndEffects() {
  const rawCards = parseData<CardData>(cardsData);
  const cards = rawCards.map(parseCardData);

  const rawEffects = parseData<EffectData>(effectsData);
  const cardsEffects = parseData<CardEffectRelation>(cardsEffectsData);
  const effects: Effect[] = [];
  for (const cardEffect of cardsEffects) {
    const card = cards.find((card) => card.id === cardEffect.id);
    const rawEffect = rawEffects.find(
      (effect) => effect.id === cardEffect.effect_id
    );

    if (rawEffect && card) {
      const effect = parseEffectData(rawEffect);
      if (card.effects) {
        card.effects.push(effect);
      } else {
        card.effects = [effect];
      }

      const effectWasAdded = effects.some(({ id }) => id === effect.id);
      if (!effectWasAdded) {
        effects.push(effect);
      }
    }
  }

  return { cards, effects };
}
