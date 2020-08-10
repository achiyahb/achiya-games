import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/snake',
    name: 'Snake',
    component: () => import('../views/Snake.vue')
  },
    {
      path: '/x-and-o',
      name: 'XAndO',
      component: () => import('../views/XAndO.vue')
    },
    {
      path: '/tetris',
      name: 'Tetris',
      component: () => import('../views/Tetris.vue')
    },
    {
      path: '/mine-sweeper',
      name: 'MineSweeper',
      component: () => import('../views/MineSweeper.vue')
    }
]

const router = new VueRouter({
  routes
})

export default router
