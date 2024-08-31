<script setup>

</script>

<template>
  <div class="homepage">
    <!-- page title -->
    <h1>Welcome to HOPEBRIDGE</h1>
    
    <!-- navigate buttons which will be modify in later assignment, this is only a simple version :) -->
    <!-- Some button hasnt been functionlised yet at this stage -->
    <div class="navigation-buttons">
      <button @click="navigateTo('home')">Homepage</button>
      <button @click="navigateTo('financial-help')">Financial Help</button>
      <button @click="navigateTo('career-help')">Career Help</button>
      <button @click="navigateTo('mental-health')">Mental Health</button>
      <button @click="navigateTo('about-us')">About Us</button>
      <button @click="navigateTo('my-account')">My Account</button>
    </div>
  </div>
</template>

<style scoped>

</style>
