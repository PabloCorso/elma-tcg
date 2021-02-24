import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { CardType, CardTypeEnum } from "../../../../../server/models";
import { CardsList, defaultShownCardTypes } from "../../organisms";
import { apiCards } from "../../../api";
import { Fab, Checkbox, FormGroup, FormControlLabel } from "@material-ui/core";
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

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShownCardTypes((state) => ({
      ...state,
      [event.target.name]: event.target.checked,
    }));
  };

  const filteredCards = cards
    ? cards.filter((card) => shownCardTypes[card.cardType])
    : [];

  return (
    <section>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={shownCardTypes[CardTypeEnum.KUSKI]}
              onChange={handleCheck}
              name={CardTypeEnum.KUSKI}
              color="primary"
            />
          }
          label="Kuskis"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={shownCardTypes[CardTypeEnum.LEVEL]}
              onChange={handleCheck}
              name={CardTypeEnum.LEVEL}
              color="primary"
            />
          }
          label="Levels"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={shownCardTypes[CardTypeEnum.INSTANT]}
              onChange={handleCheck}
              name={CardTypeEnum.INSTANT}
              color="primary"
            />
          }
          label="Instants"
        />
      </FormGroup>
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
