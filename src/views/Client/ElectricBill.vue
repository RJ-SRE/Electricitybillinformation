<template>
  <div class="electric-bill-container">
    <div class="page-header">
      <h2>电费信息管理</h2>
    </div>

    <!-- 搜索和操作栏 -->
    <div class="toolbar">
      <el-input
        v-model="searchKeyword"
        placeholder="请输入搜索关键词(用户名、地址、电表号等)"
        class="search-input"
        clearable
        @input="handleSearch"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
      <div class="toolbar-buttons">
        <el-button type="primary" @click="handleAdd" :icon="Plus">添加电费信息</el-button>
        <el-button type="danger" @click="handleBatchDelete" :icon="Delete" :disabled="selectedIds.length === 0">
          批量删除 ({{ selectedIds.length }})
        </el-button>
      </div>
    </div>

    <!-- 数据表格 -->
    <el-table
      :data="filteredData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      stripe
      border
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="username" label="用户名" width="120" />
      <el-table-column prop="address" label="地址" min-width="180" />
      <el-table-column prop="meterNumber" label="电表号" width="150" />
      <el-table-column prop="usage" label="用电量(kWh)" width="120" />
      <el-table-column prop="amount" label="金额(元)" width="120">
        <template #default="{ row }">
          <span style="color: #f56c6c; font-weight: bold;">¥{{ row.amount.toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="billingDate" label="账单日期" width="120" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="row.status === '已缴费' ? 'success' : 'warning'">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="handleEdit(row)" :icon="Edit">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(row)" :icon="Delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="billStore.filteredBills.length"
        layout="total, sizes, prev, pager, next, jumper"
      />
    </div>

    <!-- 添加/编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="600px"
    >
      <el-form :model="formData" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="formData.address" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item label="电表号" prop="meterNumber">
          <el-input v-model="formData.meterNumber" placeholder="请输入电表号" />
        </el-form-item>
        <el-form-item label="用电量" prop="usage">
          <el-input-number v-model="formData.usage" :min="0" :precision="2" placeholder="请输入用电量" />
        </el-form-item>
        <el-form-item label="金额" prop="amount">
          <el-input-number v-model="formData.amount" :min="0" :precision="2" placeholder="请输入金额" />
        </el-form-item>
        <el-form-item label="账单日期" prop="billingDate">
          <el-date-picker
            v-model="formData.billingDate"
            type="date"
            placeholder="选择日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio label="未缴费">未缴费</el-radio>
            <el-radio label="已缴费">已缴费</el-radio>
          </el-radio-group>
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
import { ref, computed, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Plus, Edit, Delete } from '@element-plus/icons-vue'
import { useElectricBillStore } from '@/store/index.js'

const billStore = useElectricBillStore()
const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const selectedIds = ref([])
const dialogVisible = ref(false)
const dialogTitle = ref('')
const formRef = ref()
const isEdit = ref(false)
const editId = ref(null)

const formData = reactive({
  username: '',
  address: '',
  meterNumber: '',
  usage: 0,
  amount: 0,
  billingDate: '',
  status: '未缴费'
})

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
  meterNumber: [{ required: true, message: '请输入电表号', trigger: 'blur' }],
  usage: [{ required: true, message: '请输入用电量', trigger: 'blur' }],
  amount: [{ required: true, message: '请输入金额', trigger: 'blur' }],
  billingDate: [{ required: true, message: '请选择日期', trigger: 'change' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }]
}

// 过滤后的数据
const filteredData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return billStore.filteredBills.slice(start, end)
})

// 搜索处理
const handleSearch = () => {
  billStore.setSearchKeyword(searchKeyword.value)
  currentPage.value = 1
}

// 选择变化
const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.id)
}

// 添加
const handleAdd = () => {
  dialogTitle.value = '添加电费信息'
  isEdit.value = false
  resetForm()
  dialogVisible.value = true
}

// 编辑
const handleEdit = (row) => {
  dialogTitle.value = '编辑电费信息'
  isEdit.value = true
  editId.value = row.id
  Object.assign(formData, row)
  dialogVisible.value = true
}

// 删除
const handleDelete = (row) => {
  ElMessageBox.confirm(`确定要删除用户"${row.username}"的电费信息吗?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    billStore.deleteBill(row.id)
    ElMessage.success('删除成功!')
  }).catch(() => {})
}

// 批量删除
const handleBatchDelete = () => {
  ElMessageBox.confirm(`确定要删除选中的 ${selectedIds.value.length} 条记录吗?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    billStore.batchDelete(selectedIds.value)
    selectedIds.value = []
    ElMessage.success('批量删除成功!')
  }).catch(() => {})
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate((valid) => {
    if (valid) {
      if (isEdit.value) {
        billStore.updateBill(editId.value, { ...formData })
        ElMessage.success('更新成功!')
      } else {
        billStore.addBill({ ...formData })
        ElMessage.success('添加成功!')
      }
      dialogVisible.value = false
      resetForm()
    }
  })
}

// 重置表单
const resetForm = () => {
  formData.username = ''
  formData.address = ''
  formData.meterNumber = ''
  formData.usage = 0
  formData.amount = 0
  formData.billingDate = ''
  formData.status = '未缴费'
  if (formRef.value) {
    formRef.value.clearValidate()
  }
}
</script>

<style scoped>
.electric-bill-container {
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

.toolbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 20px;
}

.search-input {
  flex: 1;
  max-width: 400px;
}

.toolbar-buttons {
  display: flex;
  gap: 10px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
