import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '@/components/Welcome.vue';
import Calculator from '@/components/Calculator.vue';

const routes = [
  { path: '/', component: Welcome },
  { path: '/calculadora', component: Calculator }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

