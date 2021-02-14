import ApiClient from "./apiClient";
import ApiCards from "./apiCards";
import ApiEffects from "./apiEffects";

export const apiClient = ApiClient(fetch);
export const apiCards = ApiCards(apiClient);
export const apiEffects = ApiEffects(apiClient);
