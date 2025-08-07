import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/login-view.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home-view.vue'),
    },
  ],
})

export default router
