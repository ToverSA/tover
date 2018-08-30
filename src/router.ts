import Vue from "vue";
import Router from "vue-router";

import store from "@/store";
// routes
import account from "@/account/routes";
import admin from "@/admin/routes";
import market from "@/market/routes";

Vue.use(Router);

const router = new Router({
  routes: [...admin, ...market,],
});

export default router;
