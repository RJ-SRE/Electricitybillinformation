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
