import Vue from "vue";
import Router from "vue-router";
import { routes } from "../app";
import store from "../store";

Vue.use(Router);

var router = new Router({
  mode: "hash",
  routes: routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: "Auth",
        query: { redirect: to.fullPath }
      });
    }
    next();
  } else if (to.matched.some((record) => record.meta.requiresCampus)) {
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
