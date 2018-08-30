import Auth from './views/Auth.vue';
import Profile from './views/Profile.vue';
import CreateAccount from './views/CreateAccount.vue';
export default [
    {
        path: '/auth',
        name: 'auth',
        component: Auth,
    },
    {
        path: 'create-account',
        name: 'createAccount',
        component: CreateAccount,
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: { requiresAuth: true },
    },

];
