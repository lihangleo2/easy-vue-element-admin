import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/login/login.vue'
import patient from './patient'
import recover from './recover'
import setting from './setting'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  ...patient,
  ...recover,
  ...setting
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
