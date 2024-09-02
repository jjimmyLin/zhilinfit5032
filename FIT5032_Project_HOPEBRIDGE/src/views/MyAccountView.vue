<template>
    <div class="my-account">
        <div v-if="userRole === 'admin'"> <!--by identify userrole display different content on the page-->
            <h1>Hello admin</h1>
            <!--I havent added any actual functions but my design is admin are able to see/manage some basic infos of normal users-->
        </div>
        <div v-else-if="userRole === 'user'">
            <h1>Hello user</h1>
        </div>
        <div v-else>
            <h1>Please log in😁</h1>
        </div>

        <button v-if="isLoggedIn" @click="logout" class="btn btn-secondary">Log Out</button>
        <!--modifyed, only when logged in status has this button-->
    </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { getAuth, signOut } from "firebase/auth";

const userRole = ref("user");
const auth = getAuth();
const isLoggedIn = ref(false); //default false/not logged in ensures page runs 

const checkUserRole = () => {
    const currentUser = auth.currentUser;

    if (currentUser) {
        if (currentUser.uid === "XvB9Bpe2jBWSsmJwlV9wY8wCY9E2") {
            userRole.value = "admin";
        }//This UID is the admin account that I created on Firebase console, feature is its password is not following register rule so the account is impossibly created by anyone else (also the unique UID)
        else if (currentUser.uid !== "XvB9Bpe2jBWSsmJwlV9wY8wCY9E2")
            userRole.value = "user";
    }
    else {
        userRole.value = "loggedout";
    }
};

const logout = () => {
    signOut(auth)
        .then(() => {
            alert("Successfully logged out!");
            router.push("/");
        })
        .catch((error) => {
            console.log("Error occured: ", error);
        });
};

onMounted(() => {
    checkUserRole();
});
</script>

<style scoped>
.my-account {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
}
</style>
