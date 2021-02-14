import { CardType } from "server/models";
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
    return ApiClient.post("/api/v1.0/card", card);
  };

  return {
    getAll,
    create,
  };
};

export default ApiCards;
