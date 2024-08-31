<script setup>
import NavigationBar from '@/components/NavigationBar.vue';

</script>

<template>
  <div class="main-container">
    <!-- page title -->
    <h1>Welcome to HOPEBRIDGE</h1>

    <header>
      <NavigationBar />
    </header>

    <main class="main-box">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>

</style>
