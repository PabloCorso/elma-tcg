import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  ...prefix("guides", [index("routes/guides.tsx")]),
  ...prefix("cards", [
    index("routes/cards.tsx"),
    route(":cardId", "routes/card.tsx"),
  ]),
] satisfies RouteConfig;
