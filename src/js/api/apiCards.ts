import { CardType } from "server/models";
import { ApiClientType } from "./apiClient";

const ApiCards = (ApiClient: ApiClientType) => {
  const getAll = async () => {
    return ApiClient.get("/api/v1.0/cards");
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
