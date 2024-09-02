<!--This page is for dirrerent user chekcing their own account although there are no actual function 
yet like editing, stresstest ... and so on. basically the page identified the user if is admin (only one)
or normal user (in my code is 'user'), then display different content accordingly. Also, the login status
is monitored inorder to decide whether display log out button or not-->

<template>
    <div class="my-account">
        <div v-if="userRole === 'admin'"> <!--by identify userrole display different content on the page-->
            <h1>Hello admin</h1>
            <!--I havent added any actual functions but my design is admin are able to see/manage some basic infos of normal users-->
        </div>
        <div v-else-if="userRole === 'user'">
            <h1>Hello user</h1>
        </div>
        <div v-else-if="userRole === 'loggedout'">
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
            isLoggedIn.value= true;
        }//This UID is the admin account that I created on Firebase console, feature is its password is not following register rule so the account is impossibly created by anyone else (also the unique UID)
        else if (currentUser.uid !== "XvB9Bpe2jBWSsmJwlV9wY8wCY9E2")
            userRole.value = "user";
            isLoggedIn.value= true;
    }
    else {
        userRole.value = "loggedout";
        isLoggedIn.value= false; //just in case
    }
};

const logout = () => {
    signOut(auth)
        .then(() => {
            window.location.reload();//refresh page after logged out
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

