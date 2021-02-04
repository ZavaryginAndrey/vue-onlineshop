import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/'

const routes = [
  {
    path: '/',
    name: 'Shop',
    component: () => import('../views/Shop'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth'),
    meta: {
      layout: 'auth'
    }
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('../views/Product'),
    meta: {
      layout: 'main',
      auth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth
  
  if (requireAuth && store.getters['auth/isAuthenticated']) {
    next()
  } else if (requireAuth && !store.getters['auth/isAuthenticated']) {
    next('/auth?message=auth')
  } else {
    next()
  }
})

export default router
