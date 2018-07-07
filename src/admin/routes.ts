import Dashboard from "@/admin/views/Dashboard.vue";
import Analytics from "@/admin/components/Analytics.vue";
import Campuses from "@/admin/components/Campuses.vue";
export default [
  {
    path: "/admin",
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        component: Analytics,
        name: "Analytics"
      },
      {
        path: "campuses",
        component: Campuses,
        name: "Campuses"
      }
    ]
  }
];
