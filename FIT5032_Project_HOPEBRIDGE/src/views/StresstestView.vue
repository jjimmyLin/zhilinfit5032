<template>
    <div class="stress-test">
      <h2>Stress Test</h2>
      <form @submit.prevent="submitTest">
        <div v-for="(question, index) in questions" :key="index" class="question">
          <label>{{ question.text }}</label>
          <select v-model="answers[index]" required>
            <option disabled value="">Please select...</option>
            <option v-for="option in options" :key="option.value" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
        <button type="submit">Submit Test</button>
      </form>
      <div v-if="result !== null">
        <h3>Test Result: {{ resultText }}</h3>
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
  .stress-test {
    max-width: 600px;
    margin: 0 auto;
  }
  .question {
    margin-bottom: 20px;
  }
  button {
    background-color: #4CAF50;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #45a049;
  }
  </style>
  