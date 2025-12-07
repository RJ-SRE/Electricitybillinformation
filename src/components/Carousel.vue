<template>
  <div class="carousel-container">
    <!-- TODO: 实现轮播图组件 -->
    <el-carousel height="400px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
// 轮播图组件逻辑
</script>

<style scoped>
.carousel-container {
  width: 100%;
}
</style>
