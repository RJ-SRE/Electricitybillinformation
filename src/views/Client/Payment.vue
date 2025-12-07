<template>
  <div class="payment-container">
    <div class="page-header">
      <h2>缴费记录</h2>
    </div>

    <el-table :data="paymentRecords" stripe border style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="billId" label="账单ID" width="100" />
      <el-table-column prop="username" label="用户名" width="120" />
      <el-table-column prop="amount" label="缴费金额" width="120">
        <template #default="{ row }">
          <span style="color: #67c23a; font-weight: bold;">¥{{ row.amount.toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="paymentDate" label="缴费日期" width="150" />
      <el-table-column prop="paymentMethod" label="支付方式" width="120">
        <template #default="{ row }">
          <el-tag :type="getPaymentMethodType(row.paymentMethod)">
            {{ row.paymentMethod }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" min-width="180" />
    </el-table>

    <div class="summary">
      <el-card shadow="hover">
        <template #header>
          <div class="card-header">
            <span>缴费统计</span>
          </div>
        </template>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="stat-item">
              <div class="stat-label">总缴费次数</div>
              <div class="stat-value">{{ paymentRecords.length }}</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="stat-item">
              <div class="stat-label">总缴费金额</div>
              <div class="stat-value" style="color: #67c23a;">¥{{ totalAmount.toFixed(2) }}</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="stat-item">
              <div class="stat-label">本月缴费</div>
              <div class="stat-value">0</div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const paymentRecords = ref([
  {
    id: 1,
    billId: 1001,
    username: '张三',
    amount: 150.50,
    paymentDate: '2024-01-15 10:30:00',
    paymentMethod: '支付宝',
    remark: '正常缴费'
  },
  {
    id: 2,
    billId: 1002,
    username: '李四',
    amount: 280.00,
    paymentDate: '2024-01-16 14:20:00',
    paymentMethod: '微信',
    remark: '正常缴费'
  },
  {
    id: 3,
    billId: 1003,
    username: '王五',
    amount: 98.30,
    paymentDate: '2024-01-17 09:15:00',
    paymentMethod: '银行卡',
    remark: '正常缴费'
  }
])

const totalAmount = computed(() => {
  return paymentRecords.value.reduce((sum, item) => sum + item.amount, 0)
})

const getPaymentMethodType = (method) => {
  const typeMap = {
    '支付宝': 'primary',
    '微信': 'success',
    '银行卡': 'warning',
    '现金': 'info'
  }
  return typeMap[method] || 'info'
}
</script>

<style scoped>
.payment-container {
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

.summary {
  margin-top: 24px;
}

.card-header {
  font-weight: bold;
}

.stat-item {
  text-align: center;
  padding: 20px 0;
}

.stat-label {
  font-size: 14px;
  color: #909399;
  margin-bottom: 10px;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #303133;
}
</style>
