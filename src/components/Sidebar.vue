<template>
  <div class="sidebar-container">
    <el-menu
      :default-active="activeMenu"
      :collapse="appStore.sidebarCollapse"
      router
      class="sidebar-menu"
    >
      <el-menu-item index="/home">
        <el-icon><HomeFilled /></el-icon>
        <span>首页</span>
      </el-menu-item>

      <el-sub-menu index="client">
        <template #title>
          <el-icon><User /></el-icon>
          <span>客户端</span>
        </template>
        <el-menu-item index="/client/electric-bill">
          <el-icon><Document /></el-icon>
          <span>电费信息</span>
        </el-menu-item>
        <el-menu-item index="/client/payment">
          <el-icon><Wallet /></el-icon>
          <span>缴费记录</span>
        </el-menu-item>
        <el-menu-item index="/client/statistics">
          <el-icon><DataAnalysis /></el-icon>
          <span>用电统计</span>
        </el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="admin" v-if="userStore.isAdmin">
        <template #title>
          <el-icon><Setting /></el-icon>
          <span>管理员</span>
        </template>
        <el-menu-item index="/admin/dashboard">
          <el-icon><Monitor /></el-icon>
          <span>管理首页</span>
        </el-menu-item>
        <el-menu-item index="/admin/request">
          <el-icon><Link /></el-icon>
          <span>网络请求</span>
        </el-menu-item>
        <el-menu-item index="/admin/category">
          <el-icon><Folder /></el-icon>
          <span>数据分类</span>
        </el-menu-item>
        <el-menu-item index="/admin/data-manage">
          <el-icon><Grid /></el-icon>
          <span>数据管理</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore, useAppStore } from '@/store/index.js'

const route = useRoute()
const userStore = useUserStore()
const appStore = useAppStore()

const activeMenu = computed(() => route.path)
</script>

<style scoped>
.sidebar-container {
  width: 200px;
  height: 100%;
  background: #fff;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
}

.sidebar-menu {
  border-right: none;
  height: 100%;
}

.sidebar-menu:not(.el-menu--collapse) {
  width: 200px;
}
</style>
