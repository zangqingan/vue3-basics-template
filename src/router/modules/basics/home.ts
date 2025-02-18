import type { RouteRecordRaw } from 'vue-router';

const Home: RouteRecordRaw = {
  path: '/',
  redirect: '/home',
  children: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('../../../views/home/index.vue'),
    },
  ],
};

export default Home;
