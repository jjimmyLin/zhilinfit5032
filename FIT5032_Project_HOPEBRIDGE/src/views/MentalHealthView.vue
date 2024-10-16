
<script setup>
import SuccessStoryView from './SuccessStoryView.vue';
import Rating from '@/components/Rating.vue';
</script>

<template>
    <div>
        <div class="Mentalhealth">
            <SuccessStoryView />
        </div>
        <div class="Ins-button">
            <router-link to="/InstituteList" class="btn btn-primary btn-sm">Feeling stressed? Check out your nearest Mental health Institute</router-link>
        </div>
        <div class="Rating">
            <Rating />
        </div>
    </div>
</template>

