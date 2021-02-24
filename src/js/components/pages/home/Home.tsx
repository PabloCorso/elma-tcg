import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { CardType, getValuesByCardType } from "../../../../../server/models";
import {
  CardsList,
  CardTypesFilter,
  defaultShownCardTypes,
  ShownCardTypes,
} from "../../organisms";
import { apiCards } from "../../../api";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Paths } from "../../../config";
import "./home.css";

const Home = () => {
  const [cards, setCards] = useState<CardType[]>([]);

  const getCards = async () => {
    const response = await apiCards.getAll();
    setCards(response);
  };

  useEffect(() => {
    getCards();
  }, []);

  const history = useHistory();
  const redirectToCardEdit = (cardId: number) => {
    history.push(Paths.editCard(cardId));
  };

  const [shownCardTypes, setShownCardTypes] = useState(defaultShownCardTypes);

  const filteredCards = cards
    ? cards.filter((card) => shownCardTypes[card.cardType])
    : [];

  const cardTypesCount = getValuesByCardType(0);
  for (const card of cards) {
    cardTypesCount[card.cardType] += 1;
  }

  return (
    <section>
      <CardTypesFilter
        shownCardTypes={shownCardTypes}
        cardTypesCount={cardTypesCount}
        onChange={(values: ShownCardTypes) => {
          setShownCardTypes((state) => ({ ...state, ...values }));
        }}
      />
      <CardsList
        cards={filteredCards}
        shownCardTypes={shownCardTypes}
        onEdit={redirectToCardEdit}
        onDelete={async (cardId) => {
          const success = await apiCards.del(cardId);
          if (success) {
            await getCards();
          } else {
            window.alert(
              `An error ocurred while trying to delete card id: ${cardId}`
            );
          }
        }}
      />
      <Link to={Paths.newCard}>
        <Fab
          className="fab-add"
          classes={{ root: "fab-add" }}
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </Link>
    </section>
  );
};

export default Home;
