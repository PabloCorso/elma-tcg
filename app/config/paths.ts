export const Paths = {
  home: "/",
  rules: "/rules",
  cards: "/cards",
  cardId: (id: number) => `/cards/${id}`,
  newCard: "/cards/new",
  editCardId: (id: number) => `/cards/${id}/edit`,
  effects: "/effects",
  effectId: (id: number) => `/effects/${id}`,
  newEffect: "/effects/new",
  random: "/cards/random",
  legacy: "/legacy",
  legacyRandom: "/legacy/random",
};

export const PathName: Partial<Record<keyof typeof Paths, string>> = {
  home: "Home",
  rules: "Rules",
  cards: "Cards",
  effects: "Effects",
  random: "Random",
  legacy: "Cards",
  legacyRandom: "Random",
};
