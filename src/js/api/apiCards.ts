import { ApiClientType } from "./apiClient";

const ApiCards = (ApiClient: ApiClientType) => {
  const getAll = async () => {
    return ApiClient.get("/api/v1.0/cards");
  };

  return {
    getAll,
  };
};

export default ApiCards;
