<template>
  <div class="search-bar-container">
    <!-- TODO: 实现搜索栏组件,支持精确和模糊查询 -->
    <el-input
      v-model="searchKeyword"
      placeholder="请输入搜索关键词"
      clearable
    >
      <template #append>
        <el-button icon="Search" @click="handleSearch">搜索</el-button>
      </template>
    </el-input>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchKeyword = ref('')

const handleSearch = () => {
  // TODO: 实现搜索逻辑
  console.log('搜索:', searchKeyword.value)
}
</script>

<style scoped>
.search-bar-container {
  margin-bottom: 20px;
}
</style>
