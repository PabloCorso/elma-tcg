import ApiClient from "./apiClient";
import ApiCards from "./apiCards";

export const apiClient = ApiClient(fetch);
export const apiCards = ApiCards(apiClient);
