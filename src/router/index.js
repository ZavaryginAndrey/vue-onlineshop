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
    component: () => import('../views/admin/Admin'),
    children: [
      { path: 'product/:id', component: () => import('../views/admin/Product')},
      { path: 'products', component: () => import('../views/admin/Inventory')},
      { path: 'categories', component: () => import('../views/admin/Category')}
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
  const isAdmin = store.getters['auth/role'] === 'admin'
  
  if (requireAuth && store.getters['auth/token'] && isAdmin) {
    next()
  } else if (requireAuth && !store.getters['auth/token']) {
    next('/auth?message=auth')
    store.commit('setMessage', {
      value: 'Пожалуйста войдите в систему',
      type: 'danger'
    })
  } else if (requireAuth && store.getters['auth/token'] && !isAdmin) {
    next(from)
    store.dispatch('setMessage', {
      value: 'Данный пользователь не имеет доступа администратора',
      type: 'danger'
    })
  } else {
    next()
  }
})

export default router
