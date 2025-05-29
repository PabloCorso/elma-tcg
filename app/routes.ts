import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  ...prefix("rules", [index("routes/rules.tsx")]),
  ...prefix("cards", [
    index("routes/cards.tsx"),
    route(":cardId", "routes/card.tsx"),
  ]),
] satisfies RouteConfig;
