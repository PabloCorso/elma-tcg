import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import CardForm from "../cardForm";
import { CardType, Card } from "server/models";
import { apiCards } from "../../../api";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { Paths } from "../../../config";

const cardEdition = () => {
  const [card, setCard] = useState<CardType>(Card({}));
  const handleCardChange = (newValues: Partial<CardType>) => {
    setCard((state) => ({ ...state, ...newValues }));
  };

  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const params: { cardId?: string } = useParams();
  useEffect(() => {
    const getCardIfAny = async () => {
      const cardId = Number(params.cardId);
      if (cardId) {
        try {
          const data = await apiCards.get(cardId);
          setCard(data);
        } catch (error) {
          console.error(error);
        }
      }

      setIsLoading(false);
    };

    getCardIfAny();
  }, [params]);

  const handleCreate = async (card: CardType) => apiCards.create(card);
  const handleEdit = async (card: CardType) => apiCards.edit(card);

  const redirectToCardEdit = (cardId: number) => {
    history.push(Paths.editCard(cardId));
  };

  const handleSave = async (card: CardType) => {
    const action = card.id ? handleEdit : handleCreate;
    const result = await action(card);
    const isSuccess = !result.error && result.cardId;
    if (isSuccess) {
      redirectToCardEdit(result.cardId);
    }

    return result;
  };

  return (
    <>
      {!isLoading && (
        <h1 className="title">{card.id ? "Edit card" : "New card"}</h1>
      )}
      <CardForm card={card} onChange={handleCardChange} onSave={handleSave} />
      <Backdrop open={isLoading} style={{ zIndex: 1, color: "white" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default cardEdition;
