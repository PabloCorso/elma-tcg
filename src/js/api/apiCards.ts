import { Card, CardType } from "server/models";
import { SaveCardResult } from "../../../server/routes/cardRoutes";
import { ApiClientType } from "./apiClient";

const ApiCards = (ApiClient: ApiClientType) => {
  const getAll = async () => {
    try {
      const response = await ApiClient.get("/api/v1.0/cards");
      const data: { cards: CardType[] } = await response.json();
      return data.cards || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const get = async (cardId: number) => {
    try {
      const response = await ApiClient.get(`/api/v1.0/card/${cardId}`);
      const data: { card: CardType } = await response.json();
      return Card(data.card);
    } catch (error) {
      console.error(error);
      return Card({});
    }
  };

  const create = async (card: CardType) => {
    try {
      const response = await ApiClient.post("/api/v1.0/card", card);
      const data: SaveCardResult = await response.json();
      return {
        cardId: data.cardId || 0,
        effectIds: data.effectIds || [],
        error: data.error,
      } as SaveCardResult;
    } catch (error) {
      console.error(error);
      return { error };
    }
  };

  const edit = async (card: CardType) => {
    try {
      const response = await ApiClient.put("/api/v1.0/card", card);
      const data: SaveCardResult = await response.json();
      return {
        cardId: data.cardId || 0,
        effectIds: data.effectIds || [],
        error: data.error,
      } as SaveCardResult;
    } catch (error) {
      console.error(error);
      return { error };
    }
  };

  const del = async (cardId: number) => {
    try {
      const response = await ApiClient.del(`/api/v1.0/card/${cardId}`);
      const data = await response.json();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return {
    getAll,
    get,
    create,
    edit,
    del,
  };
};

export default ApiCards;
