import { createRouter, createWebHistory } from "vue-router";
import SearchMain from '../views/SearchMain.vue';
import ResultMain from '../views/ResultMain.vue';
import PrintContent from "../components/PrintContent.vue";

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../components/Login.vue'),
  },
  {
    path: '/SearchMain',
    name: 'SearchMain',
    component: SearchMain,
  },
  {
    path: '/ResultMain',
    name: 'ResultMain',
    component: ResultMain,
  },
  {
    path: '/PrintContent',
    name: 'PrintContent',
    component: PrintContent,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.documentElement.scrollTop = 0;

  if (to.path === '/') {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  next();
});

export default router;