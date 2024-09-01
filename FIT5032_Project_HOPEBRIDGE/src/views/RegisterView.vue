<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const email = ref("");
const password = ref("");

const register = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
        console.log ("Register Successful!")
    })

    .catch((e) => {
        console.log ("Error: ", e)
    }) 
};

</script>

<template>
    <h1>
        Register a Account🚀
    </h1>

    <div>
        <input type="text" placeholder="Email" v-model="email" /> 
    </div>
    <div>
        <input type="password" placeholder="Password" v-model="password" /> 
    </div>
</template>