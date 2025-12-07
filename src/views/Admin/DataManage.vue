<template>
  <div class="data-manage-container">
    <div class="page-header">
      <h2>数据管理(CRUD)</h2>
    </div>

    <!-- 工具栏 -->
    <div class="toolbar">
      <el-input
        v-model="searchKeyword"
        placeholder="请输入搜索关键词"
        class="search-input"
        clearable
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
      <div class="toolbar-buttons">
        <el-button type="primary" @click="handleAdd" :icon="Plus">添加数据</el-button>
        <el-button type="success" @click="handleExport" :icon="Download">导出数据</el-button>
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
      <el-table-column prop="name" label="数据名称" width="150" />
      <el-table-column prop="type" label="类型" width="120">
        <template #default="{ row }">
          <el-tag>{{ row.type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="value" label="数值" width="120" />
      <el-table-column prop="description" label="描述" min-width="200" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column label="操作" width="200" fixed="right">
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
        :total="dataList.length"
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
        <el-form-item label="数据名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入数据名称" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="formData.type" placeholder="请选择类型">
            <el-option label="配置项" value="config" />
            <el-option label="参数" value="param" />
            <el-option label="设置" value="setting" />
          </el-select>
        </el-form-item>
        <el-form-item label="数值" prop="value">
          <el-input v-model="formData.value" placeholder="请输入数值" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
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
import { ref, computed, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Plus, Edit, Delete, Download } from '@element-plus/icons-vue'

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
  name: '',
  type: '',
  value: '',
  description: ''
})

const rules = {
  name: [{ required: true, message: '请输入数据名称', trigger: 'blur' }],
  type: [{ required: true, message: '请选择类型', trigger: 'change' }],
  value: [{ required: true, message: '请输入数值', trigger: 'blur' }]
}

const dataList = ref([
  {
    id: 1,
    name: '系统标题',
    type: 'config',
    value: '电费信息管理系统',
    description: '系统首页显示标题',
    createTime: '2024-01-01 10:00:00'
  },
  {
    id: 2,
    name: '每页显示数',
    type: 'param',
    value: '10',
    description: '分页每页显示的数据条数',
    createTime: '2024-01-02 11:00:00'
  },
  {
    id: 3,
    name: '电价标准',
    type: 'setting',
    value: '0.60',
    description: '当前电价标准(元/kWh)',
    createTime: '2024-01-03 12:00:00'
  }
])

const filteredData = computed(() => {
  let filtered = dataList.value
  if (searchKeyword.value) {
    filtered = filtered.filter(item =>
      JSON.stringify(item).toLowerCase().includes(searchKeyword.value.toLowerCase())
    )
  }
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filtered.slice(start, end)
})

const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.id)
}

const handleAdd = () => {
  dialogTitle.value = '添加数据'
  isEdit.value = false
  resetForm()
  dialogVisible.value = true
}

const handleEdit = (row) => {
  dialogTitle.value = '编辑数据'
  isEdit.value = true
  editId.value = row.id
  Object.assign(formData, row)
  dialogVisible.value = true
}

const handleDelete = (row) => {
  ElMessageBox.confirm(`确定要删除"${row.name}"吗?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const index = dataList.value.findIndex(item => item.id === row.id)
    if (index !== -1) {
      dataList.value.splice(index, 1)
    }
    ElMessage.success('删除成功!')
  }).catch(() => {})
}

const handleBatchDelete = () => {
  ElMessageBox.confirm(`确定要删除选中的 ${selectedIds.value.length} 条记录吗?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    dataList.value = dataList.value.filter(item => !selectedIds.value.includes(item.id))
    selectedIds.value = []
    ElMessage.success('批量删除成功!')
  }).catch(() => {})
}

const handleExport = () => {
  ElMessage.success('导出功能开发中...')
}

const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate((valid) => {
    if (valid) {
      if (isEdit.value) {
        const index = dataList.value.findIndex(item => item.id === editId.value)
        if (index !== -1) {
          dataList.value[index] = {
            ...dataList.value[index],
            ...formData,
            createTime: new Date().toLocaleString()
          }
        }
        ElMessage.success('更新成功!')
      } else {
        dataList.value.push({
          id: Date.now(),
          ...formData,
          createTime: new Date().toLocaleString()
        })
        ElMessage.success('添加成功!')
      }
      dialogVisible.value = false
      resetForm()
    }
  })
}

const resetForm = () => {
  formData.name = ''
  formData.type = ''
  formData.value = ''
  formData.description = ''
  if (formRef.value) {
    formRef.value.clearValidate()
  }
}
</script>

<style scoped>
.data-manage-container {
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
