import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/'

const routes = [
  {
    path: '/',
    name: 'Shop',
    component: () => import('../views/Shop'),
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../components/cart/Cart'),
    meta: {
      layout: 'main'
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
    component: () => import('../components/product/Product'),
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../components/admin/Admin'),
    children: [
      { path: 'product/:id', component: () => import('../components/admin/product/Product')},
      { path: 'products', component: () => import('../components/admin/inventory/Inventory')},
      { path: 'categories', component: () => import('../components/admin/category/Category')}
    ],
    meta: {
      layout: 'admin',
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
