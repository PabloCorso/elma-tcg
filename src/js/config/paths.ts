const paths = {
  home: "/",
  newCard: "/cards/new",
  editCard: (cardId?: number) =>
    cardId ? `/cards/${cardId}` : "/cards/:cardId",
};

export default paths;
