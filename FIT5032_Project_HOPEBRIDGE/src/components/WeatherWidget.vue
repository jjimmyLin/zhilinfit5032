<template>
  <div class="weather-widget">
    <div v-if="weatherData"> <!--initial validation-->
      <h4 class="location">
        {{ weatherData.name }}, {{ weatherData.sys.country }}
      </h4>
      <div class="weather-info">
        <img :src="iconUrl" alt="Weather Icon" />
        <p class="temperature">{{ temperature }} °C</p>
        <span class="description">{{ weatherData.weather[0].description }}</span>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
const apikey = "55eb0001d229b044078402b4a46e7968";

export default {
  name: "WeatherWidget",
  data() {
    return {
      weatherData: null,
    };
  },
  computed: {
    temperature() {
      return this.weatherData
        ? Math.floor(this.weatherData.main.temp - 273)
        : null;
    },
    iconUrl() {
      return this.weatherData
        ? `http://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null;
    },
  },
  //mount to DOM
  mounted() {
    this.fetchCurrentLocationWeather();
  },
  methods: {
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
          await this.fetchWeatherData(url);
        });
      }
    },
    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url);
        this.weatherData = response.data;
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    },
  },
};
</script>

<style scoped>
.weather-widget {
  position: absolute;
  top: 10px;
  right: 20px;
  background-color: rgba(176, 168, 168, 0.8);
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  width: 150px;
  height: 80px;
}

.location {
  font-size: 14px;
  font-weight: bold;
}

.weather-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  font-size: small;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.temperature {
  font-size: 10px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.description {
  font-size: 10px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
