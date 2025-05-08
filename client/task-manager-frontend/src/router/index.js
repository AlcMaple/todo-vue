// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import UserView from '../views/UserView.vue'
import AdminView from '../views/AdminView.vue'
import AdminLogin from '../views/AdminLogin.vue'
import ReadmeView from '../views/ReadmeView.vue'
import { useAuthStore } from '../store/auth'

const routes = [
  {
    path: '/',
    name: 'user',
    component: UserView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin-login',
    name: 'admin-login',
    component: AdminLogin
  },
  {
    path: '/readme',
    name: 'readme',
    component: ReadmeView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 添加全局前置守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // 检查路由是否需要认证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 检查用户是否已登录
    if (!authStore.checkAuth()) {
      // 如果没有登录，重定向到登录页面
      next({ name: 'admin-login' })
    } else {
      next() // 允许访问
    }
  } else {
    next() // 不需要认证的路由
  }
})

export default router