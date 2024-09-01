<template>
    <div class="rating">
        <h3>Leave your rating! (0-5)😀</h3>

        <!-- Inputs for Dimensions -->
        <div v-for="(dimension, index) in dimensions" :key="index" class="rating-input">
            <label :for="dimension.name">{{ dimension.label }}: </label>
            <input type="number" :id="dimension.name" v-model.number="dimension.value" min="0" max="5" step="0.5" />
            <!--restrict input type-->
            <!-- Display average scorefor each dimensions -->
            <div class="average-score">Average: {{ averageScores[dimension.name] || 0 }}</div>
        </div>

        <!-- Submit Button -->
        <button @click="submitRating">Submit Rating</button>

        <!-- Display overall average rating -->
        <div class="overall-rating">
            <h4>Overall Rating (All Users): {{ (overallRating || 0).toFixed(1) }}</h4>
        </div>
    </div>
</template>

<script>
import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default {
    name: 'Rating',
    data() {
        return {
            dimensions: [
                { name: 'relevancy', label: 'Relevancy', value: 0 },
                { name: 'clarity', label: 'Clarity', value: 0 },
                { name: 'emotional', label: 'Emotional Impact to You', value: 0 },
            ],
            overallRating: null,
            ratingsCount: 0,
            averageScores: {
                relevancy: null,
                clarity: null,
                emotional: null,
            },
        };
    },
    methods: {
        async submitRating() {
            const userAverageRating =
                this.dimensions.reduce((acc, dimension) => acc + dimension.value, 0) /
                this.dimensions.length;
            //here I calculate average first and sync to firebase, so when I retrive no need to calculate
            //codes below ensures everytime user click the submit, there will be one of set of data (score) been uploaded to firebase
            try {
                await addDoc(collection(db, 'ratings'), {
                    relevancy: this.dimensions[0].value,
                    clarity: this.dimensions[1].value,
                    emotionalImpact: this.dimensions[2].value,
                    average: userAverageRating,
                    timestamp: new Date(),
                });

                this.fetchOverallRating();

            } catch (e) {
                console.error('Error occured: ', e);
            } //catch errors

            this.dimensions.forEach((dimension) => {
                dimension.value = 0;
            }); //clear input boxes after clicking submit
        },

        async fetchOverallRating() {
            const query = await getDocs(collection(db, 'ratings'));
            let totalOverall = 0;
            let totalRelevancy = 0;
            let totalClarity = 0;
            let totalEmotional = 0;

            this.ratingsCount = query.size; //total amount of sets of ratings in db

            query.forEach((doc) => {
                const data = doc.data();
                totalOverall += data.average;
                totalRelevancy += data.relevancy;
                totalClarity += data.clarity;
                totalEmotional += data.emotionalImpact;
            }); //iterate every doc and have the sum for each dimension

            //calculate average score and set decimal 1
            this.overallRating = totalOverall / this.ratingsCount;
            this.averageScores.relevancy = (totalRelevancy / this.ratingsCount).toFixed(1);
            this.averageScores.clarity = (totalClarity / this.ratingsCount).toFixed(1);
            this.averageScores.emotional = (totalEmotional / this.ratingsCount).toFixed(1);
        },
    },
    async mounted() {
        await this.fetchOverallRating();
    }, //The mounted hook fetch and loads the data and ensures codes in templates have the ave data to display
};
</script>

<style scoped>
.rating {
    max-width: 400px;
    margin: 15px auto;
    padding: 15px;
    border: 2px solid #ddd;
    border-radius: 12px;
    background-color: #f9f9f9;
    font-family: 'Arial', sans-serif;
}

.rating-input {
    margin-bottom: 10px;
    text-align: left;
}

.average-score {
    font-size: 0.9em;
    color: #007ad9;
}

button {
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #007ad9;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #005fa3;
}

.overall-rating {
    margin-top: 20px;
    font-size: 1.2em;
    color: #333;
}
</style>