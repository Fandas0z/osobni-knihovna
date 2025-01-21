import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import Login from '../components/Auth/Login.vue';
import Register from '../components/Auth/Register.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
