import { EffectType } from "server/models";
import { ApiClientType } from "./apiClient";

type GetEffectsResult = { types: { [key: string]: EffectType[] } };

const ApiEffects = (ApiClient: ApiClientType) => {
  const getAll = async () => {
    try {
      const response = await ApiClient.get("/api/v1.0/effects");
      const data: { effects: GetEffectsResult } = await response.json();
      return data.effects || {};
    } catch (error) {
      return {};
    }
  };

  return {
    getAll,
  };
};

export default ApiEffects;
