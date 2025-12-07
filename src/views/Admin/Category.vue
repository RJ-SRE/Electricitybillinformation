<template>
  <div class="category-container">
    <div class="page-header">
      <h2>数据分类管理</h2>
    </div>

    <el-row :gutter="20">
      <!-- 分类列表 -->
      <el-col :span="10">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>分类列表</span>
              <el-button type="primary" size="small" @click="handleAddCategory">新增分类</el-button>
            </div>
          </template>
          <el-tree
            :data="categoryTree"
            :props="treeProps"
            node-key="id"
            default-expand-all
          >
            <template #default="{ data }">
              <span class="tree-node">
                <span>{{ data.label }}</span>
                <span class="tree-actions">
                  <el-button type="text" size="small" @click.stop="handleEditCategory(data)">编辑</el-button>
                  <el-button type="text" size="small" @click.stop="handleDeleteCategory(data)">删除</el-button>
                </span>
              </span>
            </template>
          </el-tree>
        </el-card>
      </el-col>

      <!-- 分类统计 -->
      <el-col :span="14">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>分类统计</span>
            </div>
          </template>
          <el-table :data="categoryStats" stripe>
            <el-table-column prop="name" label="分类名称" width="150" />
            <el-table-column prop="count" label="数据量" width="100" />
            <el-table-column prop="percentage" label="占比" width="100">
              <template #default="{ row }">
                {{ row.percentage }}%
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100">
              <template #default="{ row }">
                <el-tag :type="row.status === '启用' ? 'success' : 'info'">
                  {{ row.status }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="{ row }">
                <el-button type="text" size="small">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <!-- 添加/编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="500px"
    >
      <el-form :model="formData" label-width="100px">
        <el-form-item label="分类名称">
          <el-input v-model="formData.label" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="上级分类">
          <el-select v-model="formData.parentId" placeholder="请选择上级分类">
            <el-option label="无" :value="0" />
            <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="formData.sort" :min="0" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="formData.status" active-text="启用" inactive-text="禁用" />
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
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const dialogVisible = ref(false)
const dialogTitle = ref('')
const isEdit = ref(false)

const formData = reactive({
  label: '',
  parentId: 0,
  sort: 0,
  status: true
})

const treeProps = {
  children: 'children',
  label: 'label'
}

const categoryTree = ref([
  {
    id: 1,
    label: '居民用电',
    children: [
      { id: 11, label: '普通居民' },
      { id: 12, label: '低保户' }
    ]
  },
  {
    id: 2,
    label: '商业用电',
    children: [
      { id: 21, label: '商铺' },
      { id: 22, label: '写字楼' }
    ]
  },
  {
    id: 3,
    label: '工业用电',
    children: [
      { id: 31, label: '轻工业' },
      { id: 32, label: '重工业' }
    ]
  }
])

const categoryList = ref([
  { id: 1, label: '居民用电' },
  { id: 2, label: '商业用电' },
  { id: 3, label: '工业用电' }
])

const categoryStats = ref([
  { name: '居民用电', count: 650, percentage: 55, status: '启用' },
  { name: '商业用电', count: 320, percentage: 27, status: '启用' },
  { name: '工业用电', count: 210, percentage: 18, status: '启用' }
])

const handleAddCategory = () => {
  dialogTitle.value = '新增分类'
  isEdit.value = false
  dialogVisible.value = true
}

const handleEditCategory = (data) => {
  dialogTitle.value = '编辑分类'
  isEdit.value = true
  formData.label = data.label
  dialogVisible.value = true
}

const handleDeleteCategory = (data) => {
  ElMessageBox.confirm(`确定要删除分类"${data.label}"吗?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ElMessage.success('删除成功!')
  }).catch(() => {})
}

const handleSubmit = () => {
  ElMessage.success(isEdit.value ? '编辑成功!' : '添加成功!')
  dialogVisible.value = false
}
</script>

<style scoped>
.category-container {
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

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}

.tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.tree-actions {
  opacity: 0;
  transition: opacity 0.3s;
}

.tree-node:hover .tree-actions {
  opacity: 1;
}
</style>
