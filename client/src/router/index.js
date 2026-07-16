import { createRouter, createWebHistory } from 'vue-router';

import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Intro from '../views/Intro.vue';
import Account from '../views/Account.vue';
import Dashboard from '../views/Dashboard.vue';
import Reports from '../views/Reports.vue';
import History from '../views/History.vue';
import Finish from '../views/Finish.vue';
import Menu from '../views/Menu.vue';
import AuthLayout from '../views/AuthLayout.vue';
import AppLayout from '../views/AppLayout.vue';
import { useAuthStore } from '../store/auth.js';

const routes = [
  {
    path: '/',
    component: AuthLayout,
    children: [
      { path: '', component: Intro },
      { path: 'login', component: Login },
      { path: 'register', component: Register }
    ]
  },
  {
    path: '/',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'menu', component: Menu },
      { path: 'account', component: Account },
      { path: 'dashboard', component: Dashboard },
      { path: 'reports', component: Reports },
      { path: 'history', component: History },
      { path: 'finish', component: Finish }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isAuthenticated.value) {
    next('/');
  } else {
    next();
  }
});

export default router;

