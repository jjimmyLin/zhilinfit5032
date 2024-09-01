<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const email = ref("");
const password = ref("");

const formData = ref({ password: "" });
const errors = ref({ password: null });

const register = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            console.log("Register Successful!")
        })

        .catch((e) => {
            console.log("Error: ", e)
        })
};

//part of below password validate was from NOMONASH-LIBRARY project
const validatePassword = (blur) => {
    const password = formData.value.password
    const minLength = 9
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    if (password.length < minLength) {
        if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
    } else if (!hasUppercase) {
        if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
    } else if (!hasLowercase) {
        if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
    } else if (!hasNumber) {
        if (blur) errors.value.password = 'Password must contain at least one number.'
    } else if (!hasSpecialChar) {
        if (blur) errors.value.password = 'Password must contain at least one special character.'
    } else {
        errors.value.password = null
    }
}
const validateEmail = (blur) => {
    const email = formData.value.email;
    if (!email) {
        if (blur) errors.value.email = 'Email is required.';
    } else if (!email.includes('@')) {
        if (blur) errors.value.email = 'Email must contain an "@" character.';
    } else if (!email.endsWith('.com')) {
        if (blur) errors.value.email = 'Email must end with ".com".';
    } else {
        errors.value.email = null;
    }
};
</script>

<template>
    <h1>
        Register an Account 🚀
    </h1>

    <div class="container col-md-6 col-sm-6">
        <div>
            <label for="email" class="form-label">Email</label>
            <input type="text" class="form-control" id="email" placeholder="Email" v-model="formData.email"
                @blur="validateEmail(true)" />
            <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
        </div>

        <div>
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password" v-model="formData.password"
                @blur="validatePassword(true)" />
            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
        </div>
    </div>

    <button @click="register" class="btn btn-primary">Register</button>


</template>

<style scoped>
.container {
    align-items: center;
    justify-content: center;
}

</style>
