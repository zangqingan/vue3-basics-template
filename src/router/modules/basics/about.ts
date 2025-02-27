import type { RouteRecordRaw } from 'vue-router';

const About: RouteRecordRaw = {
  path: '/about',
  children: [
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/about/aboutIndex.vue'),
    },
  ],
};

export default About;
