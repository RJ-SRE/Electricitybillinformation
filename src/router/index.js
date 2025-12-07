import { createRouter, createWebHistory } from 'vue-router'

// 导入页面组件
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Layout from '@/views/Layout.vue'
import Home from '@/views/Home.vue'

// 客户端模块
import ElectricBill from '@/views/Client/ElectricBill.vue'
import Payment from '@/views/Client/Payment.vue'
import Statistics from '@/views/Client/Statistics.vue'

// 管理员模块
import Dashboard from '@/views/Admin/Dashboard.vue'
import Request from '@/views/Admin/Request.vue'
import Category from '@/views/Admin/Category.vue'
import DataManage from '@/views/Admin/DataManage.vue'

// 定义路由
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: '登录' }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { title: '注册' }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: { title: '首页' }
      },
      // 客户端路由
      {
        path: '/client/electric-bill',
        name: 'ElectricBill',
        component: ElectricBill,
        meta: { title: '电费信息管理' }
      },
      {
        path: '/client/payment',
        name: 'Payment',
        component: Payment,
        meta: { title: '缴费记录' }
      },
      {
        path: '/client/statistics',
        name: 'Statistics',
        component: Statistics,
        meta: { title: '用电统计' }
      },
      // 管理员路由 - 需要路由守卫
      {
        path: '/admin/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
          title: '管理首页',
          requiresAuth: true,
          requiresAdmin: true
        }
      },
      {
        path: '/admin/request',
        name: 'Request',
        component: Request,
        meta: {
          title: '网络请求',
          requiresAuth: true,
          requiresAdmin: true
        }
      },
      {
        path: '/admin/category',
        name: 'Category',
        component: Category,
        meta: {
          title: '数据分类',
          requiresAuth: true,
          requiresAdmin: true
        }
      },
      {
        path: '/admin/data-manage',
        name: 'DataManage',
        component: DataManage,
        meta: {
          title: '数据管理',
          requiresAuth: true,
          requiresAdmin: true
        }
      }
    ]
  },
  // 404 页面
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
]

// 创建路由器实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 路由守卫 - 管理员页面权限验证
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userRole = localStorage.getItem('userRole')

  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - 电费信息管理系统`
  }

  // 检查是否需要登录
  if (to.meta.requiresAuth && !token) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
    return
  }

  // 检查是否需要管理员权限
  if (to.meta.requiresAdmin && userRole !== 'admin') {
    next('/home')
    return
  }

  next()
})

export default router
