<!--import map.vue to show-->
<template>
    <div id="sidebar">
        Longitude: {{ location.lng.toFixed(4) }} | Latitude: {{ location.lat.toFixed(4) }} | Zoom: {{
            location.zoom.toFixed(2) }}
        <button class="btn btn-primary btn-sm"
            @click="location = { lng: 144.9631, lat: -37.8136, zoom: 11, pitch: 0, bearing: 0 }">
            Reset
        </button>
    </div>
    <div class="map-container">
        <Map v-model="location" />
    </div>
</template>

<script>
import Map from '@/components/Map.vue';
import 'mapbox-gl/dist/mapbox-gl.css';
export default {
    components: {
        Map
    },
    data() {
        return {
            location: {
                lng: 144.9631,
                lat: -37.8136,
                bearing: 0,
                pitch: 0,
                zoom: 11,
            }
        };
    }
};

</script>

<style>
.map-container {
    width: 80%;
    height: 400px;
    margin: auto;
}

#layout {
    flex: 1;
    display: flex;
    position: relative;
}

#sidebar {
    background-color: rgba(47, 66, 84, 0.9);
    color: #fff;
    padding: 6px 12px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    z-index: 1;
    /*ensures bar at the front*/
    position: absolute;
    margin: 12px;
    left: 225px;
    border-radius: 4px;
}
</style>