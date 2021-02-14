import { EffectType } from "server/models";
import { ApiClientType } from "./apiClient";

const ApiEffects = (ApiClient: ApiClientType) => {
  const getAll = async () => {
    try {
      const response = await ApiClient.get("/api/v1.0/effects");
      const data: { effects: EffectType[] } = await response.json();
      return data.effects || [];
    } catch (error) {
      return [];
    }
  };

  return {
    getAll,
  };
};

export default ApiEffects;
