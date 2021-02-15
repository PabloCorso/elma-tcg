import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardForm from "../cardForm";
import { CardType, Card } from "server/models";
import { apiCards } from "../../../api";
import { Backdrop, CircularProgress } from "@material-ui/core";

const CardSaveView = () => {
  const [card, setCard] = useState<CardType>(Card({}));
  const handleCardChange = (newValues: Partial<CardType>) => {
    setCard((state) => ({ ...state, ...newValues }));
  };

  const [isLoading, setIsLoading] = useState(true);

  const params: { cardId?: string } = useParams();
  useEffect(() => {
    const getCardIfAny = async () => {
      const cardId = Number(params.cardId);
      if (cardId) {
        try {
          const data = await apiCards.get(cardId);
          setCard(data);
        } catch (error) {
          console.log(error);
        }
      }

      setIsLoading(false);
    };

    getCardIfAny();
  }, [params]);

  const handleCreate = async (card: CardType) => apiCards.create(card);
  const handleEdit = async (card: CardType) => apiCards.edit(card);

  const handleSave = card.id ? handleCreate : handleEdit;
  return (
    <>
      <CardForm card={card} onChange={handleCardChange} onSave={handleSave} />
      <Backdrop open={isLoading} style={{ zIndex: 1, color: "white" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default CardSaveView;
