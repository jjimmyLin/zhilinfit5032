<template> 
    <div ref="mapContainer" class="map-container"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl';

export default {
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiamltbGluMTIxMyIsImEiOiJjbTI4cWRhMHUxcjV0MmtwdjFsaHdqa213In0.CNnXhqwPmnNq1HHiIlx5aQ'; // Replace this with your Mapbox access token

    // Initialize the map
    const map = new mapboxgl.Map({
      container: this.$refs.mapContainer,
      style: "mapbox://styles/mapbox/streets-v12", // Replace with your preferred map style
      center: [-71.224518, 42.213995], // Initial map center [longitude, latitude]
      zoom: 9, // Initial zoom level
    });

    this.map = map;
  },

  unmounted() {
    // Clean up the map instance when the component is destroyed
    if (this.map) {
      this.map.remove();
    }
  },
};
</script>

<style scoped>
.map-container {
  height: 100vh; /* Ensure the map takes full screen height */
  width: 100%;  /* Ensure the map takes full width */
}
</style>
