<!--This page is for dirrerent user chekcing their own account although there are no actual function 
yet like editing, stresstest ... and so on. basically the page identified the user if is admin (only one)
or normal user (in my code is 'user'), then display different content accordingly. Also, the login status
is monitored inorder to decide whether display log out button or not-->

<template>
    <div class="my-account">
        <div v-if="userRole === 'admin'"> <!-- By identifying user role display different content on the page -->
            <h1>Hello admin</h1>
        </div>

        <div v-else-if="userRole === 'user'">
            <h1>Hello user: {{ email }}</h1>
            <div class="button">
                <button type="button" v-if="isLoggedIn" @click="logout" class="btn btn-light">Log Out</button>
            </div>
            <!--updated 14/10-->

            <!-- Chart displaying user's stress test history -->
            <div v-if="stressTests.length > 0" class="mt-5">
                <Chart type="line" :data="chartData" :options="chartOptions" />
            </div>
            <div v-else>
                <p>No stress test results found.</p>
            </div>
        </div>

        <div v-else-if="userRole === 'loggedout'">
            <h1>Please Log in😁</h1>
            <router-link to="/Login" class="btn btn-primary btn-sm">Log in</router-link>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase"; // Ensure firebase.js is correctly set up
import Chart from 'primevue/chart';

const userRole = ref("user"); //role
const auth = getAuth(); //get authinfo
const isLoggedIn = ref(false); //boolean to check login status
const stressTests = ref([]); //a const set for performing chart
const email = ref(""); //to display email address

const chartData = ref(null);

//edit chart display style
const chartOptions = ref({
    responsive: true,
    plugins: {
        legend: { //the wording below title
            position: 'top',
            labels: { //the wording below title
                color: 'white',
                font: {
                    size: 20
                }
            },
        },
        title: { //chart table title
            display: true,
            text: 'Your Stress Test History',
            color: 'white',
            font: {
                size: 40
            }
        },
    },

    //styles,colors,fonts for x/y signs
    scales: {
        x: {
            title: {
                display: true,
                text: 'Date',
                color: 'white',
                font: {
                    size: 30
                }
            },
            ticks: {
                color: 'white',
                font: {
                    size: 20
                }
            },
            grid: {
                color: 'rgba(230, 255, 255, 1)',
            },
        },
        y: {
            title: {
                display: true,
                text: 'Stress Level',
                color: 'white',
                font: {
                    size: 40
                }
            },
            ticks: {
                color: 'white',
                font: {
                    size: 20
                }
            },
            grid: {
                color: 'rgba(230, 255, 255, 1)',
            },
            min: 0,
            max: 5
        },
    },
});

//method to sync test data
const fetchStressTests = async () => {
    const currentUser = auth.currentUser;

    if (currentUser) {
        email.value = currentUser.email;
        try {
            const q = query(
                collection(db, "stressTests"), //stands for the collection stored as name "stressTests" on firebase
                where("uid", "==", currentUser.uid) //match with user uid
            );
            const queryget = await getDocs(q);
            //get data from existing collections
            const localdataset = [];//store locally after retrive

            queryget.forEach((doc) => {
                const data = doc.data();
                localdataset.push({
                    date: new Date(data.timestamp.seconds * 1000).toLocaleDateString(),
                    result: data.result,
                });// added retrived data to local set
            }); //run a for loop to get all the datas

            stressTests.value = localdataset;
            //assign retrived data to stressTest const

            // Prepare data for chart
            chartData.value = {
                labels: stressTests.value
                .sort((a, b) => new Date(a.date) - new Date(b.date)) 
                //touse (a, b) are two sets which includes date and result for each
                //sort() des or asc based on reulst neg or pos, hence minus a by b
                //if a date is later than b, then reuslt for sort() will be positive
                //sort() runs for whole set, which is stressTest.value here
                //this line sorts the date
                .map(test => test.date),
                datasets: [
                    {
                        label: 'Stress Level',
                        data: stressTests.value.map(test => test.result),
                        fill: false,
                        borderColor: '#42A5F5',
                        tension: 0.4,
                    },
                ],
            };
        } catch (e) {
            console.error("Error fetching stress test data: ", e);
        } //error catch
    }
};


//identify user role (guest/user/admin)
const checkUserRole = () => {
    const currentUser = auth.currentUser;

    if (currentUser) {
        if (currentUser.uid === "XvB9Bpe2jBWSsmJwlV9wY8wCY9E2") {
            userRole.value = "admin";
            isLoggedIn.value = true;
        } else {
            userRole.value = "user";
            isLoggedIn.value = true;
            fetchStressTests(); // Fetch stress tests for normal user
        }
    } else {
        userRole.value = "loggedout";
        isLoggedIn.value = false;
    }
};

//logout funtion
const logout = () => {
    signOut(auth)
        .then(() => {
            window.location.reload(); // Refresh page after logging out
            alert("Successfully logged out!");
        })
        .catch((error) => {
            console.log("Error occurred: ", error);
        });
};

//run
onMounted(() => {
    checkUserRole();
});
</script>

<style scoped>
.my-account {
    padding: 25px;
}

.button {
    padding: 10px;
}
</style>
