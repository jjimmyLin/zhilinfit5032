<!--This is the main vue file runs the website, basically have the navigation bar, allow user to 
navigate to differnt sections like log in, register or mental health-->

<script setup>
import NavigationBar from '@/components/NavigationBar.vue';

</script>

<template>
    <h1 class="page-title text-center">💖 Welcome to HOPEBRIDGE 💖</h1>

    <div class="main-container">
        
      <header>
        <NavigationBar />
      </header>
      
      <main class="main-box">
        <div class="sub-container">
          
        </div>
        <router-view></router-view>
      </main>
    </div>
</template>

<style scoped>
    .main-container 
{
  text-align: center;
  padding: 20px;
  margin-top: 0%;
  padding-top: 0%;
}

    .page-title 
{
  font-size: 3rem; 
  color: #2c3e50;  
  margin-bottom: 20px; 
  background-color: rgb(255, 255, 255);
  margin-bottom: 0%;
}
    .sub-container
{
  width:max-content;
}

main {
  background-color: #1b2a47; /* 板块背景色，和导航栏下划线颜色相融合 */
  color: white; /* 白色文字使得可读性更高 */
  padding: 20px;
  min-height: 300px; /* 设置一个最小高度 */
}

</style>
