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
    path: "/market/:id",
    component: components.MarketAsset,
    name: "MarketAsset"
  },
  {
    path: "/search",
    component: components.Search,
    name: "Search"
  }
];
