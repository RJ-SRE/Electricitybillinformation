<template>
  <div class="statistics-container">
    <div class="page-header">
      <h2>用电统计</h2>
    </div>

    <!-- 统计卡片 -->
    <el-row :gutter="20" class="stats-row">
      <el-col :span="6" v-for="stat in statistics" :key="stat.id">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <el-icon :size="48" :color="stat.color">
              <component :is="stat.icon" />
            </el-icon>
            <div class="stat-info">
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 月度用电趋势 -->
    <el-card shadow="hover" class="chart-card">
      <template #header>
        <div class="card-header">
          <span>月度用电趋势</span>
        </div>
      </template>
      <div class="chart-placeholder">
        <el-icon :size="60"><TrendCharts /></el-icon>
        <p>数据可视化图表展示区域</p>
        <p class="chart-tip">（可集成 ECharts 实现图表展示）</p>
      </div>
    </el-card>

    <!-- 用电详情表格 -->
    <el-card shadow="hover" class="table-card">
      <template #header>
        <div class="card-header">
          <span>用电详情</span>
        </div>
      </template>
      <el-table :data="usageData" stripe>
        <el-table-column prop="month" label="月份" width="120" />
        <el-table-column prop="usage" label="用电量(kWh)" width="150" />
        <el-table-column prop="cost" label="费用(元)" width="150">
          <template #default="{ row }">
            <span style="color: #f56c6c; font-weight: bold;">¥{{ row.cost.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="rate" label="电价(元/kWh)" width="150" />
        <el-table-column prop="trend" label="环比" width="120">
          <template #default="{ row }">
            <el-tag :type="row.trend > 0 ? 'danger' : 'success'">
              {{ row.trend > 0 ? '+' : '' }}{{ row.trend }}%
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, markRaw } from 'vue'
import { TrendCharts, Lightning, Wallet, Calendar } from '@element-plus/icons-vue'

const statistics = ref([
  {
    id: 1,
    label: '本月用电',
    value: '320 kWh',
    icon: markRaw(Lightning),
    color: '#409eff'
  },
  {
    id: 2,
    label: '本月费用',
    value: '¥192.00',
    icon: markRaw(Wallet),
    color: '#67c23a'
  },
  {
    id: 3,
    label: '年度用电',
    value: '3650 kWh',
    icon: markRaw(TrendCharts),
    color: '#e6a23c'
  },
  {
    id: 4,
    label: '平均每日',
    value: '10.6 kWh',
    icon: markRaw(Calendar),
    color: '#f56c6c'
  }
])

const usageData = ref([
  { month: '2024-01', usage: 280, cost: 168.00, rate: 0.60, trend: -5 },
  { month: '2024-02', usage: 250, cost: 150.00, rate: 0.60, trend: -10 },
  { month: '2024-03', usage: 300, cost: 180.00, rate: 0.60, trend: 20 },
  { month: '2024-04', usage: 310, cost: 186.00, rate: 0.60, trend: 3 },
  { month: '2024-05', usage: 320, cost: 192.00, rate: 0.60, trend: 3 }
])
</script>

<style scoped>
.statistics-container {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h2 {
  color: #303133;
  font-size: 24px;
  margin: 0;
}

.stats-row {
  margin-bottom: 24px;
}

.stat-card {
  margin-bottom: 20px;
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: #909399;
}

.chart-card, .table-card {
  margin-bottom: 24px;
}

.card-header {
  font-weight: bold;
}

.chart-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: #909399;
}

.chart-placeholder p {
  margin: 10px 0;
  font-size: 16px;
}

.chart-tip {
  font-size: 14px;
  color: #c0c4cc;
}
</style>
