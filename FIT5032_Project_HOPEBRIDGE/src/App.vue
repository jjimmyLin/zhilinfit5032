<!--This is the main vue file runs the website, basically have the navigation bar, allow user to 
navigate to differnt sections like log in, register or mental health-->

<script setup>
import NavigationBar from '@/components/NavigationBar.vue';

</script>

<template>
    <div class="main-container">
      <!-- page title -->
      <h1 class="page-title">❤️ Welcome to HOPEBRIDGE ❤️</h1>
  
      <header>
        <NavigationBar />
      </header>
  
      <main class="main-box">
        <router-view></router-view>
      </main>
    </div>
</template>

<style scoped>
    .main-container 
{
  text-align: center;
  padding: 20px;
}

    .page-title 
{
  font-size: 3rem; 
  color: #2c3e50;  
  margin-bottom: 20px; 
}

</style>
