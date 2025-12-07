<template>
  <div class="layout-container">
    <Header />
    <div class="main-content">
      <Sidebar />
      <div class="content-area">
        <router-view />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import Footer from '@/components/Footer.vue'
</script>

<style scoped>
.layout-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
}

.main-content {
  flex: 1;
  display: flex;
}

.content-area {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>
