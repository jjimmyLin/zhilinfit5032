<script setup>
</script>

<template>
  <div class="Home container my-5">
    <div class="row align-items-center">
      <!-- Image section -->
      <div class="col-md-6 order-1 mb-4 mb-md-0">
        <img src="@/assets/picture/helping3.jpg" alt="Homepage Image" class="img-fluid rounded mx-auto d-block" />
      </div>

      <!-- Right-side content section -->
      <div class="Intro col-md-6 order-2 text-center">
        <h1 class="display-4 mb-3">Welcome to HOPEBRIDGE</h1>
        <p class="lead">
          At Hopebridge, we empower individuals who have been long-term unemployed to rediscover new opportunities, regain their mental strength, and rebuild their confidence.
        </p>
        <p class="mb-4">
          Through personalized resources and a supportive community, we provide practical solutions to help you navigate life’s challenges and create a brighter future.
        </p>
        <ul class="Resource text-center">
          <li><strong>Career Development:</strong> Find the tools to rebuild your career path.</li>
          <li><strong>Mental Health Support:</strong> Access resources to manage stress and anxiety.</li>
          <li><strong>Community Engagement:</strong> Connect with others and share your journey.</li>
        </ul>
        <h3 class="font-weight-bold mt-4">Are you ready to check your stress levels?</h3>
        <p class="mb-4">
          Take our <strong>Stress Test</strong> to assess your current mental well-being and receive personalized tips on how to manage it. Start your journey toward a more balanced life.
        </p>
        <router-link to="/Stresstest" class="btn btn-primary btn-lg mb-3">Take the Stress Test</router-link>
        <br />
        <router-link to="/Mentalhealth" class="btn btn-outline-secondary btn-sm">Explore Mentalhealth Support</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  pointer-events: none;
}
.Home {
  padding:0%; /* Reduced padding to bring content up */
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color: #ffffff;
}

.Intro {
  margin-top: 0%;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 10px; /* Reduced bottom margin for the heading */
}

p.lead {
  font-size: 1.25rem;
  margin-bottom: 15px;
}

ul {
  text-align: left;
  margin: 20px 0;
}

ul li {
  margin-bottom: 10px;
}

h3 {
  margin-top: 30px;
  margin-bottom: 15px;
}

.btn-primary {
  margin-top: 20px;
}

.btn-outline-secondary {
  font-size: 0.875rem;
  margin-top: 10px;
}
</style>
