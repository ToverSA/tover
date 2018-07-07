import * as components from "./components";

export default [
  {
    path: "/",
    component: components.Home,
    name: "Home"
  },
  {
    path: "/market",
    component: components.Market,
    name: "Market",
    meta: { requiresCampus: true }
  },
  {
    path: "/market/:category",
    component: components.Market,
    name: "MarketCategory",
    meta: { requiresCampus: true }
  },
  {
    path: "/asset/:id",
    component: components.MarketAsset,
    name: "MarketAsset"
  },
  {
    path: "/search",
    component: components.Search,
    name: "Search"
  }
];
