import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '@/components/Welcome.vue';
import Calculator from '@/components/Calculator.vue';
import Register from '@/components/Register.vue';
import Login from '@/components/Login.vue';
import Transport from '@/components/areas/Transport.vue';
import Food from '@/components/areas/Food.vue';
import Energy from '@/components/areas/Energy.vue';
import Waste from '@/components/areas/Waste.vue';
import Result from '@/components/Result.vue';

const routes = [
  { path: '/', component: Welcome },
  { path: '/calculate', component: Calculator },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/transport', component: Transport },
  { path: '/food', component: Food },
  { path: '/energy', component: Energy },
  { path: '/waste', component: Waste },
  { path: '/result', component: Result },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

