<!--import map.vue to show-->
<template>
    <Map v-model="location" />

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
                zoom: 9,
            }
        };
    }
};

</script>

<style>
#layout {
    flex: 1;
    display: flex;
    position: relative;
}
</style>