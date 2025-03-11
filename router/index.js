import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '@/components/Welcome.vue';
import Calculator from '@/components/Calculator.vue';
import Register from '@/components/Register.vue';
import Login from '@/components/Login.vue';

const routes = [
  { path: '/', component: Welcome },
  { path: '/calculate', component: Calculator },
  { path: '/register', component: Register },
  { path: '/login', component: Login }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

