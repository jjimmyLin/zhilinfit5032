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
            <div v-if="result !== null" class="alert alert-info mt-4">
              <h3 class="text-center">Test Result: {{ resultText }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // Predefined stress test questions
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
        // Options for each question, 1-5 stress levels
        options: [
          { value: 1, text: "Never" },
          { value: 2, text: "Rarely" },
          { value: 3, text: "Sometimes" },
          { value: 4, text: "Often" },
          { value: 5, text: "Always" },
        ],
        // User's answers to each question
        answers: Array(8).fill(null),
        // Result of the test
        result: null,
      };
    },
    computed: {
      // Text description based on the result
      resultText() {
        if (this.result < 2) return "Low Stress";
        else if (this.result < 3) return "Moderate Stress";
        else if (this.result < 4) return "High Stress";
        else return "Very High Stress";
      },
    },
    methods: {
      submitTest() {
        // Validate that all questions are answered
        if (this.answers.includes(null)) {
          alert("Please answer all the questions!");
          return;
        }
  
        // Calculate the average score
        const totalScore = this.answers.reduce((acc, answer) => acc + answer, 0);
        const averageScore = totalScore / this.answers.length;
  
        // Set the result
        this.result = averageScore;
      },
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
    background-color: #1a2b48; /* Adjust as needed */
    padding: 20px;
    border-radius: 8px;
  }
  
  .content {
    color: white;
  }
  </style>
  