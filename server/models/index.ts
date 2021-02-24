import { CardType as CardTypeDefinition } from "./card";
import { EffectType as EffectTypeDefinition } from "./effect";
import { CardEffectType as CardEffectDefinition } from "./cardEffect";
import { ValuesByCardType as ValuesByCardTypeDef } from "./cardTypeEnum";

export type CardType = CardTypeDefinition;
export type EffectType = EffectTypeDefinition;
export type CardEffectType = CardEffectDefinition;
export type ValuesByCardType<T> = ValuesByCardTypeDef<T>;

export { default as Effect, EffectFromDb } from "./effect";
export { default as Card, CardFromDb } from "./card";
export { default as CardEffect } from "./cardEffect";
export { default as CardTypeEnum, getValuesByCardType } from "./cardTypeEnum";
export { default as Rarity } from "./rarity";
