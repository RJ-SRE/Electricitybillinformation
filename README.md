# Electricitybillinformation

## 项目简介

基于 vite 创建一个 Vue 项目(单页面应用),要求在页面中对电费信息进行常规管理,
具体管理功能需要包括电费信息查找(通过输入信息做精确或模糊查询)、添加电费信息、修改
电费信息及删除电费信息(含批量删除)等。

要求页面能够实现多个模块的信息管理,模块通过菜单项切换。页面布局,请在如下
页面布局列表中的选择:
- A.左右布局:左边显示切换菜单,右边显示内容(及操作)。
- B.上下布局:上边显示切换菜单,下边显示内容(及操作)。

页面实现必须基于 Vue 框架技术,除了登录和注册外,至少实现三个功能模块的信息
管理,包括首页(轮播图),每个模块按功能划分做不同角度的信息管理,多多益善。具体来说,
客户端要有三个功能模块,首页(建议做轮播图),另两个功能模块视选题自己决定)。管理员
端也要有三个模块,首页(共用),网络请求、数据分类、数据管理(增删改查含批量删除)。
要求使用路由技术,通过组件切换实现。部分页面(管理员端)要求设置路由守卫。

数据管理要求使用 pinia 中间件,store 包括多页面共享和调用的 state 数据、getters()、
actions(),并对数据作本地存储持久化。

---

## 1. 创建项目

使用 Vite 创建 Vue 3 项目:

```bash
# 使用 npm
npm create vite@latest electricitybillinformation -- --template vue

# 或使用 yarn
yarn create vite electricitybillinformation --template vue

# 或使用 pnpm
pnpm create vite electricitybillinformation --template vue
```

进入项目目录:

```bash
cd electricitybillinformation
```

安装基础依赖:

```bash
npm install
```

## 2. 安装依赖

安装项目所需的核心依赖包:

```bash
# 安装 Vue Router
npm install vue-router@4

# 安装 Pinia 状态管理
npm install pinia

# 安装 Element Plus UI 组件库
npm install element-plus

# 安装 Pinia 持久化插件
npm install pinia-plugin-persistedstate

# 安装 Element Plus 图标库(可选)
npm install @element-plus/icons-vue
```

或一次性安装所有依赖:

```bash
npm install vue-router@4 pinia element-plus pinia-plugin-persistedstate @element-plus/icons-vue
```

## 3. 配置 main.js 文件

在 `src/main.js` 文件中注册所有插件和组件库:

```javascript
import { createApp } from 'vue'
import App from './App.vue'

// 导入 Vue Router
import router from './router'

// 导入 Pinia
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 导入 Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 导入 Element Plus 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 创建 Vue 应用实例
const app = createApp(App)

// 创建 Pinia 实例并配置持久化插件
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// 注册 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 使用插件
app.use(pinia)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn, // 设置中文语言包
})

// 挂载应用
app.mount('#app')
```

## 4. 组件层次关系

根据项目需求,建议采用以下组件层次结构:

```
src/
├── App.vue                    # 根组件
├── main.js                    # 入口文件
├── views/                     # 页面组件
│   ├── Login.vue             # 登录页面
│   ├── Register.vue          # 注册页面
│   ├── Layout.vue            # 布局容器组件
│   │   ├── Header.vue        # 头部组件
│   │   ├── Sidebar.vue       # 侧边栏菜单(左右布局)
│   │   ├── NavMenu.vue       # 顶部菜单(上下布局)
│   │   └── Footer.vue        # 底部组件
│   ├── Home.vue              # 首页(轮播图)
│   ├── Client/               # 客户端模块
│   │   ├── ElectricBill.vue  # 电费信息管理
│   │   ├── Payment.vue       # 缴费记录
│   │   └── Statistics.vue    # 用电统计
│   └── Admin/                # 管理员模块
│       ├── Dashboard.vue     # 管理首页
│       ├── Request.vue       # 网络请求管理
│       ├── Category.vue      # 数据分类
│       └── DataManage.vue    # 数据管理(CRUD)
├── components/               # 公共组件
│   ├── Carousel.vue         # 轮播图组件
│   ├── SearchBar.vue        # 搜索栏组件
│   ├── DataTable.vue        # 数据表格组件
│   └── Dialog.vue           # 对话框组件
├── router/                   # 路由配置
│   └── index.js
└── store/                    # 状态管理
    └── index.js
```

**组件关系说明:**
- `App.vue` 是根组件,包含 `<router-view>` 用于路由切换
- `Layout.vue` 是布局容器,包含 Header、Sidebar/NavMenu 和主内容区
- 页面组件位于 `views/` 目录,按模块分类
- 公共组件位于 `components/` 目录,可被多个页面复用

## 5. 创建路由文件 `router/index.js`

在 `src/router/index.js` 中配置路由:

```javascript
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
```

## 6. 创建数据文件 `store/index.js`

在 `src/store/index.js` 中配置 Pinia 状态管理:

```javascript
import { defineStore } from 'pinia'

// 用户信息 Store
export const useUserStore = defineStore('user', {
  // State - 状态数据
  state: () => ({
    token: '',
    userInfo: {
      id: '',
      username: '',
      email: '',
      role: '' // 'user' 或 'admin'
    },
    isLoggedIn: false
  }),

  // Getters - 计算属性
  getters: {
    // 获取用户名
    getUserName: (state) => state.userInfo.username,

    // 判断是否为管理员
    isAdmin: (state) => state.userInfo.role === 'admin',

    // 获取完整用户信息
    getFullUserInfo: (state) => state.userInfo
  },

  // Actions - 修改状态的方法
  actions: {
    // 设置用户信息
    setUserInfo(userInfo) {
      this.userInfo = userInfo
      this.isLoggedIn = true
    },

    // 设置 Token
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
    },

    // 登录
    login(userData) {
      this.setToken(userData.token)
      this.setUserInfo(userData.userInfo)
      localStorage.setItem('userRole', userData.userInfo.role)
    },

    // 登出
    logout() {
      this.token = ''
      this.userInfo = {
        id: '',
        username: '',
        email: '',
        role: ''
      }
      this.isLoggedIn = false
      localStorage.removeItem('token')
      localStorage.removeItem('userRole')
    }
  },

  // 开启数据持久化
  persist: true
})

// 电费信息 Store
export const useElectricBillStore = defineStore('electricBill', {
  state: () => ({
    billList: [], // 电费列表
    currentBill: null, // 当前选中的电费
    searchKeyword: '', // 搜索关键词
  }),

  getters: {
    // 获取电费总数
    totalBills: (state) => state.billList.length,

    // 根据搜索关键词过滤电费列表
    filteredBills: (state) => {
      if (!state.searchKeyword) {
        return state.billList
      }
      return state.billList.filter(bill =>
        JSON.stringify(bill).toLowerCase().includes(state.searchKeyword.toLowerCase())
      )
    },

    // 计算总金额
    totalAmount: (state) => {
      return state.billList.reduce((sum, bill) => sum + (bill.amount || 0), 0)
    }
  },

  actions: {
    // 设置电费列表
    setBillList(list) {
      this.billList = list
    },

    // 添加电费信息
    addBill(bill) {
      this.billList.push({
        ...bill,
        id: Date.now(),
        createTime: new Date().toISOString()
      })
    },

    // 更新电费信息
    updateBill(id, updatedBill) {
      const index = this.billList.findIndex(bill => bill.id === id)
      if (index !== -1) {
        this.billList[index] = { ...this.billList[index], ...updatedBill }
      }
    },

    // 删除电费信息
    deleteBill(id) {
      this.billList = this.billList.filter(bill => bill.id !== id)
    },

    // 批量删除
    batchDelete(ids) {
      this.billList = this.billList.filter(bill => !ids.includes(bill.id))
    },

    // 设置搜索关键词
    setSearchKeyword(keyword) {
      this.searchKeyword = keyword
    },

    // 清空搜索
    clearSearch() {
      this.searchKeyword = ''
    }
  },

  persist: true
})

// 应用配置 Store
export const useAppStore = defineStore('app', {
  state: () => ({
    layoutType: 'left', // 'left' 左右布局, 'top' 上下布局
    sidebarCollapse: false, // 侧边栏是否折叠
    theme: 'light', // 主题: 'light' 或 'dark'
  }),

  getters: {
    // 获取布局类型
    getLayoutType: (state) => state.layoutType,
  },

  actions: {
    // 切换布局
    toggleLayout() {
      this.layoutType = this.layoutType === 'left' ? 'top' : 'left'
    },

    // 切换侧边栏
    toggleSidebar() {
      this.sidebarCollapse = !this.sidebarCollapse
    },

    // 设置主题
    setTheme(theme) {
      this.theme = theme
    }
  },

  persist: true
})
```

## 7. 页面前端设计框架图

### 7.1 整体架构设计

```
┌─────────────────────────────────────────────────────────────┐
│                    电费信息管理系统                          │
│                  (Vue 3 + Vite + Pinia)                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ├─────────────────┬──────────────────┐
                              │                 │                  │
                        ┌─────▼─────┐    ┌─────▼─────┐    ┌──────▼──────┐
                        │  路由层    │    │  状态层    │    │   视图层     │
                        │  Router   │    │   Pinia   │    │   Views     │
                        └───────────┘    └───────────┘    └─────────────┘
                              │                 │                  │
                ┌─────────────┼─────────────┐   │    ┌────────────┼────────────┐
                │             │             │   │    │            │            │
          ┌─────▼─────┐ ┌────▼────┐  ┌────▼───▼──┐ │      ┌────▼─────┐ ┌────▼─────┐
          │  登录注册  │ │ 客户端  │  │  管理端   │ │      │ UI 组件库 │ │ 自定义组件│
          │   模块    │ │  模块   │  │   模块    │ │      │Element Plus│ │Components│
          └───────────┘ └─────────┘  └───────────┘ │      └──────────┘ └──────────┘
                                                    │
                              ┌─────────────────────┘
                              │
                    ┌─────────▼──────────┐
                    │    数据持久化       │
                    │  LocalStorage      │
                    └────────────────────┘
```

### 7.2 页面布局设计 - 左右布局(推荐)

```
┌──────────────────────────────────────────────────────────────┐
│                        顶部导航栏 Header                        │
│  Logo  |  电费管理系统  |  用户信息  |  退出                    │
└──────────────────────────────────────────────────────────────┘
┌────────────┬─────────────────────────────────────────────────┐
│            │                                                   │
│  侧边菜单   │                 主内容区                          │
│  Sidebar  │              <router-view>                       │
│            │                                                   │
│ ├─ 首页    │  ┌─────────────────────────────────────────┐    │
│ ├─ 电费管理 │  │                                          │    │
│ ├─ 缴费记录 │  │         页面内容展示区域                   │    │
│ ├─ 用电统计 │  │                                          │    │
│ └─ 管理后台 │  │      (表格、表单、图表等)                  │    │
│   ├─ 请求  │  │                                          │    │
│   ├─ 分类  │  │                                          │    │
│   └─ 数据  │  └─────────────────────────────────────────┘    │
│            │                                                   │
│            │  分页组件 Pagination                               │
│            │                                                   │
└────────────┴─────────────────────────────────────────────────┘
│                        底部信息 Footer                         │
└──────────────────────────────────────────────────────────────┘
```

### 7.3 页面布局设计 - 上下布局

```
┌──────────────────────────────────────────────────────────────┐
│                        顶部导航栏 Header                        │
│  Logo  |  电费管理系统  |  用户信息  |  退出                    │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│                        水平菜单栏 NavMenu                       │
│  首页 | 电费管理 | 缴费记录 | 用电统计 | 管理后台 ▼              │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│                                                                │
│                     主内容区 <router-view>                      │
│                                                                │
│  ┌─────────────────────────────────────────────────────┐     │
│  │                                                       │     │
│  │              页面内容展示区域                          │     │
│  │                                                       │     │
│  │          (表格、表单、图表等)                          │     │
│  │                                                       │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                                │
│  分页组件 Pagination                                            │
│                                                                │
└──────────────────────────────────────────────────────────────┘
│                        底部信息 Footer                         │
└──────────────────────────────────────────────────────────────┘
```

### 7.4 核心功能模块流程图

```
                          ┌──────────┐
                          │  用户访问  │
                          └─────┬────┘
                                │
                        ┌───────▼────────┐
                        │  路由守卫判断   │
                        └───────┬────────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
              ┌─────▼─────┐         ┌──────▼──────┐
              │  已登录    │         │   未登录     │
              └─────┬─────┘         └──────┬──────┘
                    │                      │
                    │               ┌──────▼──────┐
                    │               │  登录/注册   │
                    │               └──────┬──────┘
                    │                      │
                    │         ┌────────────┘
                    │         │
              ┌─────▼─────────▼─────┐
              │    进入主页面         │
              └─────────┬────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
  ┌─────▼─────┐  ┌─────▼─────┐  ┌──────▼──────┐
  │ 客户端模块 │  │ 管理员模块 │  │   首页展示   │
  └─────┬─────┘  └─────┬─────┘  └──────┬──────┘
        │               │               │
        │        ┌──────▼──────┐        │
        │        │ 权限验证     │        │
        │        └──────┬──────┘        │
        │               │               │
  ┌─────▼───────────────▼───────────────▼─────┐
  │           Pinia 状态管理                    │
  │   ├─ UserStore (用户信息)                  │
  │   ├─ ElectricBillStore (电费数据)          │
  │   └─ AppStore (应用配置)                   │
  └──────────────────┬─────────────────────────┘
                     │
           ┌─────────▼──────────┐
           │   数据持久化存储     │
           │   LocalStorage     │
           └────────────────────┘
```

### 7.5 数据流向设计

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   用户操作   │ ───▶ │   Vue 组件   │ ───▶ │ Pinia Store │
│  (UI Event) │      │  (Methods)  │      │  (Actions)  │
└─────────────┘      └─────────────┘      └──────┬──────┘
                                                  │
                            ┌─────────────────────┘
                            │
                     ┌──────▼──────┐
                     │ State 更新   │
                     └──────┬──────┘
                            │
                ┌───────────┼───────────┐
                │                       │
         ┌──────▼──────┐        ┌──────▼──────┐
         │  组件响应式   │        │  持久化存储  │
         │   更新渲染    │        │ LocalStorage│
         └─────────────┘        └─────────────┘
```

### 7.6 技术栈总结

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue 3 | 3.x | 前端框架 |
| Vite | 最新 | 构建工具 |
| Vue Router | 4.x | 路由管理 |
| Pinia | 2.x | 状态管理 |
| Element Plus | 最新 | UI 组件库 |
| pinia-plugin-persistedstate | 最新 | 数据持久化 |

## 启动项目

```bash
# 开发环境运行
npm run dev

# 生产环境构建
npm run build

# 预览生产构建
npm run preview
```

## 项目特性

- ✅ 基于 Vue 3 Composition API
- ✅ 使用 Vite 进行快速构建
- ✅ 集成 Element Plus UI 组件库
- ✅ Pinia 状态管理 + 数据持久化
- ✅ Vue Router 路由守卫保护
- ✅ 支持左右/上下两种布局方式
- ✅ 响应式设计,适配多端
- ✅ 完整的增删改查功能
- ✅ 支持批量操作
- ✅ 精确/模糊搜索功能

## 开发规范

1. 组件命名采用 PascalCase
2. 文件命名采用 kebab-case 或 PascalCase
3. 使用 ESLint 进行代码规范检查
4. 提交代码前需通过 lint 检查
5. 遵循 Vue 3 组合式 API 开发规范

## 许可证

MIT License
