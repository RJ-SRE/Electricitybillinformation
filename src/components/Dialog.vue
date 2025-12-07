<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="500px"
  >
    <slot></slot>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  title: {
    type: String,
    default: '提示'
  }
})

const dialogVisible = ref(false)

const handleClose = () => {
  dialogVisible.value = false
}

const handleConfirm = () => {
  // TODO: 实现确认逻辑
  dialogVisible.value = false
}
</script>

<style scoped>
</style>
