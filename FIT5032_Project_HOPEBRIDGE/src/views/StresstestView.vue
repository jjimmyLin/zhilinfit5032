<template>
    <div class="container my-4">
        <div class="row">
            <!-- Image column (on large and medium screens, order 1; on small screens, order 2) -->
            <div class="col-md-6 order-md-1 order-2">
                <img src="@/assets/picture/6.png" alt="Image" class="img-fluid" />
            </div>

            <!-- Text/Table content column (on large and medium screens, order 2; on small screens, order 1) -->
            <div class="col-md-6 order-md-2 order-1">
                <div class="content">
                    <h2 class="text-center">Stress Test</h2>
                    <form @submit.prevent="submitTest" class="needs-validation" novalidate>
                        <div v-for="(question, index) in questions" :key="index" class="mb-3">
                            <label class="form-label">{{ question.text }}</label>
                            <select v-model="answers[index]" class="form-select" required>
                                <option disabled value="">Please select...</option>
                                <option v-for="option in options" :key="option.value" :value="option.value">
                                    {{ option.text }}
                                </option>
                            </select>
                            <div class="invalid-feedback">Please select an option.</div>
                        </div>
                        <button type="submit" class="btn btn-primary btn-lg w-100 mt-4">Submit Test</button>
                    </form>
                    <!-- Display result as an alert for guests -->
                    <div v-if="showResult" class="alert alert-info mt-4">
                        <h3 class="text-center" v-html="resultMessage"></h3>
                        <div v-if="!isLoggedIn" class="text-center mt-3">
                            <p>Want to save your test results? <a href="/Login" class="alert-link">Log in</a> now!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "@/firebase"; // Assuming firebase.js exports the Firestore instance

export default {
    data() {
        return {
            // Stress test questions
            questions: [
                { text: "Do you feel anxious about your financial situation?" },
                { text: "Are you worried about not finding a job?" },
                { text: "Do you feel isolated or find it difficult to maintain social relationships?" },
                { text: "Do you feel your self-worth has decreased due to unemployment?" },
                { text: "Do you feel physically tired or notice a decline in sleep quality?" },
                { text: "Do you feel a lack of motivation to search for new job opportunities?" },
                { text: "Do you experience emotional swings due to stress?" },
                { text: "Do you feel you need help with your mental health?" },
            ],
            // Options for each question, indictaes 1-5 stress levels
            options: [
                { value: 1, text: "Never - 1" },
                { value: 2, text: "Rarely - 2" },
                { value: 3, text: "Sometimes - 3" },
                { value: 4, text: "Often - 4" },
                { value: 5, text: "Always - 5" },
            ],
            // User's answers to each question
            answers: Array(8).fill(null),
            // Result of the test
            result: null,
            // Boolean to control result display for guests
            showResult: false,
            resultMessage: '',
            isLoggedIn: false, // Check if user is logged in
        };
    },
    computed: {
        // Compute the result description based on the test result
        resultText() {
            if (this.result < 2) return "Low Stress";
            else if (this.result < 3) return "Moderate Stress";
            else if (this.result < 4) return "High Stress";
            else return "Very High Stress";
        },
    },
    methods: {
        async submitTest() {
            const auth = getAuth();
            const currentUser = auth.currentUser;

            // Validate that all questions are answered
            if (this.answers.includes(null)) {
                alert("Please answer all the questions!");
                return;
            }

            // Calculate the average score
            const totalScore = this.answers.reduce((acc, answer) => acc + answer, 0);
            const averageScore = totalScore / this.answers.length;
            this.result = averageScore;

            // Generate result message for the user
            if (averageScore < 2) {
                this.resultMessage = "Your stress is Low <br> Congratulations!";
            } else if (averageScore < 3) {
                this.resultMessage = "Your stress is Moderate. Doing well, but take care of yourself!";
            } else if (averageScore < 4) {
                this.resultMessage = "Your stress is High. You might want to take a break and seek support.";
            } else {
                this.resultMessage = "Your stress is Very High. Need help? Check out our resources!";
            }

            // Display result for guests and logged in users
            this.showResult = true;

            // If user is logged in, save result to Firestore
            if (currentUser) {
                this.isLoggedIn = true;
                try {
                    await addDoc(collection(db, "stressTests"), {
                        uid: currentUser.uid, // Store user's uid
                        answers: this.answers,
                        result: averageScore,
                        timestamp: new Date(),
                    });
                    alert("Test results saved successfully!");
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            } else {
                this.isLoggedIn = false; // For guests, don't save the result
            }
        }
    },
};
</script>

<style scoped>
/* For better image responsiveness */
.img-fluid {
    max-width: 100%;
    height: auto;
}

.container {
    background-color: #1a2b48;
    padding: 20px;
    border-radius: 8px;
}

.content {
    color: white;
}
</style>