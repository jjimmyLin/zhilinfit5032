<!--The below structure was form mapbox website tutorial: https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-vue/-->

<template>
    <div ref="mapContainer" class="map-container"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl';

export default {
    props: ['modelValue'],

    mounted() {
        mapboxgl.accessToken = 'pk.eyJ1IjoiamltbGluMTIxMyIsImEiOiJjbTI4cWRhMHUxcjV0MmtwdjFsaHdqa213In0.CNnXhqwPmnNq1HHiIlx5aQ'; // Replace this with your Mapbox access token

        const { lng, lat, zoom, bearing, pitch } = this.modelValue;

        // Initialize the map
        const map = new mapboxgl.Map({
            container: this.$refs.mapContainer,
            style: "mapbox://styles/jimlin1213/cm28u622400lg01omalppduft", // Replace with your preferred map style
            center: [lng, lat],
            bearing,
            pitch,
            zoom,
        });
        const updateLocation = () =>
            this.$emit('update:modelValue', this.getLocation());

        map.on('move', updateLocation);
        map.on('zoom', updateLocation);
        map.on('rotate', updateLocation);
        map.on('pitch', updateLocation);
        this.map = map;
    },

    unmounted() {
        // Clean up the map instance when the component is destroyed
        if (this.map) {
            this.map.remove();
        }

    },
    watch: {
        modelValue(next) {
            const curr = this.getLocation()
            const map = this.map

            if (curr.lng != next.lng || curr.lat != next.lat)
                map.setCenter({ lng: next.lng, lat: next.lat })
            if (curr.pitch != next.pitch) map.setPitch(next.pitch)
            if (curr.bearing != next.bearing) map.setBearing(next.bearing)
            if (curr.zoom != next.zoom) map.setZoom(next.zoom)
        }
    },
    methods: {
        getLocation() {
            return {
                ...this.map.getCenter(),
                bearing: this.map.getBearing(),
                pitch: this.map.getPitch(),
                zoom: this.map.getZoom(),
            }
        }
    },
};
</script>

<style scoped>
.map-container {
    height: 100vh;
    /* Ensure the map takes full screen height */
    width: 100%;
    /* Ensure the map takes full width */
}
</style>
