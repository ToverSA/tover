import Auth from './views/Auth.vue';
import Profile from './views/Profile.vue';
export default [
    {
        path: '/auth',
        name: 'auth',
        component: Auth,
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: { requiresAuth: true },
    },

];
