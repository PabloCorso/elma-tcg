export type Card = {
  id: number;
  name: string;
  cardType?: CardType | string;
  type1?: string;
  type2?: string;
  pr1?: number | null;
  pr2?: number | null;
  pr3?: number | null;
  pr4?: number | null;
  pr5?: number | null;
  pr6?: number | null;
  battleLengthMin?: number | null;
  battleLengthMax?: number | null;
  flavorText?: string;
  rarity?: Rarity | string;
  effectsSize?: string | null;
  effects?: Effect[];
};

export type Effect = {
  text: string;
  italicText: string;
};

export enum CardType {
  KUSKI = "Kuski",
  LEVEL = "Level",
  INSTANT = "Instant",
}

export enum Rarity {
  C = "C",
  U = "U",
  R = "R",
}
