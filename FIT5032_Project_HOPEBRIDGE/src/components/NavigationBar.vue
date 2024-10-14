<!--This is the Navigationbar function vue, which gives clear routes to different pages. you may see some of
them are commented since they are no need to display at this stage-->

<template>
  <div class="container-fluid">
    <ul class="nav nav-underline justify-content-center">
      <li class="nav-item">
        <router-link to="/" class="nav-link" active-class="active" aria-current="page">
          Homepage
        </router-link>
      </li>
      <!-- Uncomment other links as needed -->
      <li class="nav-item">
        <router-link to="/MentalHealth" class="nav-link" active-class="active">
          Mental Health
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/AboutUs" class="nav-link" active-class="active">
          About Us
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/MyAccount" class="nav-link" active-class="active">
          My Account
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/Login" class="nav-link" active-class="active">
          Log in
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/Register" class="nav-link" active-class="active">
          Register
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/Stresstest" class="nav-link" active-class="active">
          Stresstest
        </router-link>
      </li>
    </ul>
  </div>
</template>


<style scoped>
.nav-underline .nav-item {
  margin-right: 25px; /* 每个导航项之间增加一定的间距 */
}

.nav-underline .nav-link {
  padding: 8px 15px; /* 增加链接的内边距，使其更宽松 */
  font-weight: 400; /* 适当增加字体粗细，提升可读性 */
  font-family: Arial, sans-serif;
  font-size:large;
  color: black;
}

.nav-underline .nav-link.active {
  font-weight: bold;
  background-color: #f2f6f7ef; /* 为激活项增加背景色 */
  border-radius: 5px; /* 增加一点圆角，看起来更柔和 */
}
</style>