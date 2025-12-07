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
