<!--This page basically was from registerviewpage just to remain consistency of the look, and 
functionised by changing from register to login, removed password valied as I believe a 
registered user should know their pw and if theres validation will look like a "hint" to 
the pw structure, instead when login with  :) hope it make sense-->
<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const error = ref({
    email: null,
    password: null
});
const router = useRouter();

const login = () => {
    validateEmail(true);

    if (!error.value.email) {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email.value, password.value)
            .then(() => {
                console.log("Login Successful!");
                alert("Login Successful!");
                router.push("/MyAccount");  // Redirect to MyAccount
            })
            .catch((e) => {
                alert("Error occurred: \n" + e.message + " \nPlease input correct information");
            });
    }
};

const validateEmail = (blur) => {
    if (!email.value) {
        if (blur) error.value.email = 'Email is required.';
    } else if (!email.value.includes('@')) {
        if (blur) error.value.email = 'Email must contain an "@" character.';
    } else if (!email.value.endsWith('.com')) {
        if (blur) error.value.email = 'Email must end with ".com".';
    } else {
        error.value.email = null;
    }
};
</script>


<template>
    <h1>
        😀 Please log in 😀
    </h1>

    <div class="container col-md-6 col-sm-6">
        <div>
            <p>
                <input type="text" v-model="email" @blur="validateEmail(true)" placeholder="Email" />
            </p>
            <p v-if="error.email" style="color: red;">{{ error.email }}</p>
        </div>

        <div>
            <p>
                <input type="password" v-model="password" placeholder="Password" />
            </p>
            <p v-if="error.password" style="color: red;">{{ error.password }}</p>
        </div>
    </div>

    <button @click="login" class="btn btn-primary">Login</button>


</template>

<style scoped>
.container {
    align-items: center;
    justify-content: center;
}
</style>
