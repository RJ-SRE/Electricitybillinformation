<template>
  <div class="dashboard-container">
    <div class="page-header">
      <h2>管理员控制台</h2>
    </div>

    <!-- 数据概览 -->
    <el-row :gutter="20" class="overview-row">
      <el-col :span="6" v-for="item in overviewData" :key="item.id">
        <el-card shadow="hover" class="overview-card">
          <div class="overview-content">
            <el-icon :size="40" :color="item.color">
              <component :is="item.icon" />
            </el-icon>
            <div class="overview-info">
              <div class="overview-value">{{ item.value }}</div>
              <div class="overview-label">{{ item.label }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 系统信息 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>系统信息</span>
            </div>
          </template>
          <el-descriptions :column="1" border>
            <el-descriptions-item label="系统版本">v1.0.0</el-descriptions-item>
            <el-descriptions-item label="框架">Vue 3 + Vite</el-descriptions-item>
            <el-descriptions-item label="UI库">Element Plus</el-descriptions-item>
            <el-descriptions-item label="状态管理">Pinia</el-descriptions-item>
            <el-descriptions-item label="运行环境">开发环境</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>快捷操作</span>
            </div>
          </template>
          <div class="quick-actions">
            <el-button type="primary" :icon="Document" @click="goTo('/admin/data-manage')">数据管理</el-button>
            <el-button type="success" :icon="Folder" @click="goTo('/admin/category')">数据分类</el-button>
            <el-button type="warning" :icon="Link" @click="goTo('/admin/request')">网络请求</el-button>
            <el-button type="info" :icon="User" @click="goTo('/home')">返回首页</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, markRaw } from 'vue'
import { useRouter } from 'vue-router'
import { User, Tickets, Wallet, TrendCharts, Document, Folder, Link } from '@element-plus/icons-vue'

const router = useRouter()

const overviewData = ref([
  {
    id: 1,
    label: '总用户数',
    value: '156',
    icon: markRaw(User),
    color: '#409eff'
  },
  {
    id: 2,
    label: '总账单数',
    value: '1,234',
    icon: markRaw(Tickets),
    color: '#67c23a'
  },
  {
    id: 3,
    label: '总收入',
    value: '¥98,765',
    icon: markRaw(Wallet),
    color: '#e6a23c'
  },
  {
    id: 4,
    label: '本月增长',
    value: '+12.5%',
    icon: markRaw(TrendCharts),
    color: '#f56c6c'
  }
])

const goTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.dashboard-container {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h2 {
  color: #303133;
  font-size: 24px;
  margin: 0;
}

.overview-row {
  margin-bottom: 24px;
}

.overview-card {
  margin-bottom: 20px;
}

.overview-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.overview-info {
  flex: 1;
}

.overview-value {
  font-size: 28px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 8px;
}

.overview-label {
  font-size: 14px;
  color: #909399;
}

.card-header {
  font-weight: bold;
}

.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.quick-actions .el-button {
  width: 100%;
}
</style>
