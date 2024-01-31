import { createRouter, createWebHistory } from 'vue-router'

import {
  default_routes
} from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: default_routes
})

export default router
