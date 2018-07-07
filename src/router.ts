import Vue from "vue";
import Router from "vue-router";

import store from "@/store";
// routes
import account from "@/account/routes";
import admin from "@/admin/routes";
import market from "@/market/routes";

Vue.use(Router);

const router = new Router({
  routes: [...account, ...admin, ...market]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: "Auth",
        query: { redirect: to.fullPath }
      });
    }
    next();
  } else if (to.matched.some(record => record.meta.requiresCampus)) {
    if (!store.getters.campusSet) {
      next({
        name: "CampusChooser",
        params: { id: "guest" },
        query: { redirect: to.fullPath }
      });
    }
  }
  next();
});

export default router;
