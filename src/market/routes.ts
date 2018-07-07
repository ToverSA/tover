import Home from "@/market/views/Home.vue";
import Market from "@/market/views/Market.vue";
import MarketAsset from "@/market/views/MarketAsset.vue";
export default [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/market",
    name: "Market",
    component: Market,
    meta: { requiresCampus: true }
  },
  {
    path: "/market/:category",
    name: "MarketCategory",
    component: Market,
    meta: { requiresCampus: true }
  },
  {
    path: "/market/asset/:id",
    name: "MarketAsset",
    component: MarketAsset,
    meta: { requiresCampus: true }
  }
];
