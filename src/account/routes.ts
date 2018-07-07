import Auth from "@/account/views/Auth.vue";
import Account from "@/account/views/Account.vue";
import CampusChooser from "@/account/views/CampusChooser.vue";
import Adverts from "@/account/components/Adverts.vue";
import Chat from "@/account/components/Chat.vue";
import CreateAdvert from "@/account/components/CreateAdvert.vue";
import Profile from "@/account/components/Profile.vue";

export default [
  {
    path: "/account",
    component: Account,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        component: Adverts,
        name: "Adverts"
      },
      {
        path: "chat",
        component: Chat,
        name: "Chat"
      },
      {
        path: "create",
        component: CreateAdvert,
        name: "CreateAdvert"
      },
      {
        path: "profile",
        component: Profile,
        name: "Profile"
      }
    ]
  },
  {
    path: "/auth",
    component: Auth,
    name: "Auth"
  },
  {
    path: "/campus/:id",
    component: CampusChooser,
    name: "CampusChooser"
  }
];
