<template>
  <div class="home-container">
    <h2 class="page-title">欢迎使用电费信息管理系统</h2>

    <!-- 轮播图 -->
    <el-carousel :interval="4000" height="400px" class="carousel">
      <el-carousel-item v-for="item in carouselItems" :key="item.id">
        <div class="carousel-item" :style="{ background: item.color }">
          <div class="carousel-content">
            <el-icon :size="60" class="carousel-icon">
              <component :is="item.icon" />
            </el-icon>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>

    <!-- 功能卡片 -->
    <div class="features">
      <h3 class="section-title">主要功能</h3>
      <el-row :gutter="20">
        <el-col :span="8" v-for="feature in features" :key="feature.id">
          <el-card class="feature-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <el-icon :size="24">
                  <component :is="feature.icon" />
                </el-icon>
                <span>{{ feature.title }}</span>
              </div>
            </template>
            <p>{{ feature.description }}</p>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 统计信息 -->
    <div class="statistics">
      <h3 class="section-title">数据概览</h3>
      <el-row :gutter="20">
        <el-col :span="6" v-for="stat in statistics" :key="stat.id">
          <div class="stat-card">
            <el-icon :size="40" :color="stat.color">
              <component :is="stat.icon" />
            </el-icon>
            <div class="stat-info">
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, markRaw } from 'vue'
import { Document, Wallet, DataAnalysis, Setting, TrendCharts, User, Tickets } from '@element-plus/icons-vue'
import { useElectricBillStore } from '@/store/index.js'

const billStore = useElectricBillStore()

const carouselItems = ref([
  {
    id: 1,
    title: '智能电费管理',
    description: '高效管理您的电费信息,一键查询、添加、修改和删除',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    icon: markRaw(Document)
  },
  {
    id: 2,
    title: '在线缴费记录',
    description: '记录每一笔缴费历史,清晰明了,随时可查',
    color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    icon: markRaw(Wallet)
  },
  {
    id: 3,
    title: '用电数据统计',
    description: '可视化展示用电数据,帮助您更好地了解用电情况',
    color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    icon: markRaw(DataAnalysis)
  },
  {
    id: 4,
    title: '系统管理后台',
    description: '强大的管理功能,支持数据分类和批量操作',
    color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    icon: markRaw(Setting)
  }
])

const features = ref([
  {
    id: 1,
    title: '电费信息管理',
    description: '支持精确和模糊查询,轻松管理所有电费信息',
    icon: markRaw(Document)
  },
  {
    id: 2,
    title: '缴费记录查询',
    description: '完整记录每一次缴费,支持历史记录查询',
    icon: markRaw(Wallet)
  },
  {
    id: 3,
    title: '用电数据分析',
    description: '图表展示用电趋势,帮助优化用电策略',
    icon: markRaw(TrendCharts)
  }
])

const statistics = ref([
  {
    id: 1,
    label: '电费记录',
    value: billStore.totalBills,
    icon: markRaw(Tickets),
    color: '#409eff'
  },
  {
    id: 2,
    label: '总金额',
    value: `¥${billStore.totalAmount.toFixed(2)}`,
    icon: markRaw(Wallet),
    color: '#67c23a'
  },
  {
    id: 3,
    label: '本月账单',
    value: '0',
    icon: markRaw(Document),
    color: '#e6a23c'
  },
  {
    id: 4,
    label: '用户数',
    value: '1',
    icon: markRaw(User),
    color: '#f56c6c'
  }
])
</script>

<style scoped>
.home-container {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
}

.page-title {
  text-align: center;
  margin-bottom: 30px;
  color: #303133;
  font-size: 28px;
}

.carousel {
  margin-bottom: 40px;
  border-radius: 8px;
  overflow: hidden;
}

.carousel-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: white;
}

.carousel-content {
  text-align: center;
}

.carousel-icon {
  margin-bottom: 20px;
}

.carousel-content h3 {
  font-size: 32px;
  margin-bottom: 10px;
}

.carousel-content p {
  font-size: 18px;
  opacity: 0.9;
}

.section-title {
  margin-bottom: 20px;
  color: #303133;
  font-size: 20px;
  padding-left: 10px;
  border-left: 4px solid #409eff;
}

.features {
  margin-bottom: 40px;
}

.feature-card {
  margin-bottom: 20px;
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
}

.statistics {
  margin-top: 40px;
}

.stat-card {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 16px;
  transition: transform 0.3s;
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.15);
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #909399;
}
</style>
