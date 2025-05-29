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
import History from '@/components/History.vue';
import WelcomeAuth from '../src/components/authenticated/WelcomeAuth.vue';
import { authGuard } from '../src/services/AuthGuard';
import HistoryDetail from '../src/components/HistoryDetail.vue';



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
  { path: '/history', component: History },
  { path: '/welcome-auth', component: WelcomeAuth, beforeEnter: authGuard},
  { path: '/history/:id/detail', component:HistoryDetail}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

