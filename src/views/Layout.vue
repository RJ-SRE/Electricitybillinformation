<template>
  <div class="layout-container">
    <Header />
    <div class="main-content">
      <Sidebar v-if="layoutType === 'left'" />
      <NavMenu v-if="layoutType === 'top'" />
      <div class="content-area">
        <router-view />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import Header from './Header.vue'
// import Sidebar from './Sidebar.vue'
// import NavMenu from './NavMenu.vue'
// import Footer from './Footer.vue'

const layoutType = ref('left') // 'left' 或 'top'
</script>

<style scoped>
.layout-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  display: flex;
}

.content-area {
  flex: 1;
  padding: 20px;
}
</style>
