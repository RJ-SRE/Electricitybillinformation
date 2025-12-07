<template>
  <div class="request-container">
    <div class="page-header">
      <h2>网络请求管理</h2>
    </div>

    <!-- API 列表 -->
    <el-card shadow="hover" class="api-card">
      <template #header>
        <div class="card-header">
          <span>API 接口列表</span>
          <el-button type="primary" size="small" @click="handleAddApi">新增接口</el-button>
        </div>
      </template>
      <el-table :data="apiList" stripe border>
        <el-table-column prop="name" label="接口名称" width="200" />
        <el-table-column prop="method" label="请求方式" width="100">
          <template #default="{ row }">
            <el-tag :type="getMethodType(row.method)">{{ row.method }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="请求地址" min-width="300" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === '正常' ? 'success' : 'danger'">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="calls" label="调用次数" width="100" />
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleTestApi(row)">测试</el-button>
            <el-button type="success" size="small" @click="handleEditApi(row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDeleteApi(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 请求统计 -->
    <el-row :gutter="20" class="stats-row">
      <el-col :span="6" v-for="stat in requestStats" :key="stat.id">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <el-icon :size="40" :color="stat.color">
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

    <!-- 添加/编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="600px"
    >
      <el-form :model="formData" label-width="100px">
        <el-form-item label="接口名称">
          <el-input v-model="formData.name" placeholder="请输入接口名称" />
        </el-form-item>
        <el-form-item label="请求方式">
          <el-select v-model="formData.method" placeholder="请选择请求方式">
            <el-option label="GET" value="GET" />
            <el-option label="POST" value="POST" />
            <el-option label="PUT" value="PUT" />
            <el-option label="DELETE" value="DELETE" />
          </el-select>
        </el-form-item>
        <el-form-item label="请求地址">
          <el-input v-model="formData.url" placeholder="请输入请求地址" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="formData.description" type="textarea" rows="3" placeholder="请输入描述" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, markRaw } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Link, Check, Close, TrendCharts } from '@element-plus/icons-vue'

const dialogVisible = ref(false)
const dialogTitle = ref('')
const isEdit = ref(false)

const formData = reactive({
  name: '',
  method: 'GET',
  url: '',
  description: ''
})

const apiList = ref([
  {
    id: 1,
    name: '获取电费列表',
    method: 'GET',
    url: '/api/bills',
    status: '正常',
    calls: 1234
  },
  {
    id: 2,
    name: '添加电费信息',
    method: 'POST',
    url: '/api/bills',
    status: '正常',
    calls: 567
  },
  {
    id: 3,
    name: '更新电费信息',
    method: 'PUT',
    url: '/api/bills/:id',
    status: '正常',
    calls: 345
  },
  {
    id: 4,
    name: '删除电费信息',
    method: 'DELETE',
    url: '/api/bills/:id',
    status: '正常',
    calls: 123
  }
])

const requestStats = ref([
  {
    id: 1,
    label: '总接口数',
    value: apiList.value.length,
    icon: markRaw(Link),
    color: '#409eff'
  },
  {
    id: 2,
    label: '正常运行',
    value: apiList.value.filter(api => api.status === '正常').length,
    icon: markRaw(Check),
    color: '#67c23a'
  },
  {
    id: 3,
    label: '异常接口',
    value: '0',
    icon: markRaw(Close),
    color: '#f56c6c'
  },
  {
    id: 4,
    label: '总调用次数',
    value: apiList.value.reduce((sum, api) => sum + api.calls, 0),
    icon: markRaw(TrendCharts),
    color: '#e6a23c'
  }
])

const getMethodType = (method) => {
  const typeMap = {
    'GET': 'success',
    'POST': 'primary',
    'PUT': 'warning',
    'DELETE': 'danger'
  }
  return typeMap[method] || 'info'
}

const handleAddApi = () => {
  dialogTitle.value = '新增接口'
  isEdit.value = false
  dialogVisible.value = true
}

const handleEditApi = (row) => {
  dialogTitle.value = '编辑接口'
  isEdit.value = true
  Object.assign(formData, row)
  dialogVisible.value = true
}

const handleDeleteApi = (row) => {
  ElMessageBox.confirm(`确定要删除接口"${row.name}"吗?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ElMessage.success('删除成功!')
  }).catch(() => {})
}

const handleTestApi = (row) => {
  ElMessage.info(`正在测试接口: ${row.name}`)
  setTimeout(() => {
    ElMessage.success('接口测试通过!')
  }, 1000)
}

const handleSubmit = () => {
  ElMessage.success(isEdit.value ? '编辑成功!' : '添加成功!')
  dialogVisible.value = false
}
</script>

<style scoped>
.request-container {
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

.api-card {
  margin-bottom: 24px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}

.stats-row {
  margin-top: 24px;
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
</style>
