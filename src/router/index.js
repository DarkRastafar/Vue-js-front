import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import BodyTable from '@/components/BodyTable'



const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/tableWebSocket',
    name: 'bodyTable',
    component: BodyTable
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
