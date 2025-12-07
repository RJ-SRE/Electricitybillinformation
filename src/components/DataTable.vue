<template>
  <div class="data-table-container">
    <!-- TODO: 实现数据表格组件 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="名称" />
      <el-table-column label="操作" width="200">
        <template #default>
          <el-button size="small">编辑</el-button>
          <el-button size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([])
</script>

<style scoped>
.data-table-container {
  margin-top: 20px;
}
</style>
