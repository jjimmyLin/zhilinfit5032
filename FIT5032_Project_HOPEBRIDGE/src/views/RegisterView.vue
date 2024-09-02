<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const errors = ref({
    email: null,
    password: null
});
const router = useRouter();


const register = () => {
    validateEmail(true);
    validatePassword(true); 
    //run these two method again before register ensures valid email and password to be uploaded

    if (!errors.value.email && !errors.value.password) {
        createUserWithEmailAndPassword(getAuth(), email.value, password.value)
            .then((data) => {
                console.log("Register Successful!")
                alert("Register Successful!");
                router.push("/");
            })

            .catch((e) => {
                console.log("Error: ", e)
            })
    }
};

//part of below password validate was from NOMONASH-LIBRARY project
const validatePassword = (blur) => {
    const minLength = 9
    const hasUppercase = /[A-Z]/.test(password.value)
    const hasLowercase = /[a-z]/.test(password.value)
    const hasNumber = /\d/.test(password.value)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password.value)

    if (password.value.length < minLength) {
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
    if (!email.value) {
        if (blur) errors.value.email = 'Email is required.';
    } else if (!email.value.includes('@')) {
        if (blur) errors.value.email = 'Email must contain an "@" character.';
    } else if (!email.value.endsWith('.com')) {
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
            <p>
                <input type="text" v-model="email" @blur="validateEmail(true)" placeholder="Email" />
            </p>
            <p v-if="errors.email" style="color: red;">{{ errors.email }}</p>
        </div>

        <div>
            <p>
                <input type="password" v-model="password" @blur="validatePassword(true)" placeholder="Password" />
            </p>
            <p v-if="errors.password" style="color: red;">{{ errors.password }}</p>
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
