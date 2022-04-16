import { createRouter, createWebHashHistory } from 'vue-router'
import authRouter from '../modules/login/router/index'
import chatRouter from '../modules/chat/router/index'
import checkToken from '../modules/login/router/authGuard'
const routes = [
  {
    path: '/',
    ...authRouter,
  },
  {
    path: '/chat',
    ...chatRouter,
    beforeEnter: [ checkToken ]
  },
  { 
    path:'/:pathMatch(.*)*',     
    component: () => import('../components/NotFound.vue') 
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
