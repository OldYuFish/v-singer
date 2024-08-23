import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useAuthGuard } from "./guard";

const routes: readonly RouteRecordRaw[] = [
  {
    path: '/v-singer/:id',
    name: 'home',
    meta: { key: 'home', relation: '0', title: '歌单', to: '' },
    component: () => import('@/views/common/home/index.vue'),
  },
  {
    path: '/exception',
    name: 'exception',
    children: [
      {
        path: '/404',
        name: 'NotFound',
        meta: { title: '页面丢失' },
        component: () => import('@/views/common/exception/404.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)',
    name: 'non-exist',
    redirect: 'exception/404',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

new useAuthGuard(router);

export default router;
