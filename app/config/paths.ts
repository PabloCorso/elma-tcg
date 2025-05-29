export const Paths = {
  home: "/",
  rules: "/rules",
  cards: "/cards",
  cardId: (id: number) => `/cards/${id}`,
};

export const PathName: Partial<Record<keyof typeof Paths, string>> = {
  home: "Home",
  rules: "Rules",
  cards: "Cards",
};
