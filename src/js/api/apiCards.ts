import { CardType } from "server/models";
import { CreateCardResult } from "../../../server/routes/cardRoutes";
import { ApiClientType } from "./apiClient";

const ApiCards = (ApiClient: ApiClientType) => {
  const getAll = async () => {
    try {
      const response = await ApiClient.get("/api/v1.0/cards");
      const data: { cards: CardType[] } = await response.json();
      return data.cards || [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const create = async (card: CardType) => {
    try {
      const response = await ApiClient.post("/api/v1.0/card", card);
      const data: CreateCardResult = await response.json();
      return {
        cardId: data.cardId || 0,
        effectIds: data.effectIds || [],
        error: data.error,
      } as CreateCardResult;
    } catch (error) {
      console.log(error);
      return { error };
    }
  };

  return {
    getAll,
    create,
  };
};

export default ApiCards;
