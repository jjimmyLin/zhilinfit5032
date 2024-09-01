import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import App from './App.vue'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQM6sMoTu2wiE8g4vO9G_up9WfM0xGIKc",
  authDomain: "hopebridge-845f9.firebaseapp.com",
  projectId: "hopebridge-845f9",
  storageBucket: "hopebridge-845f9.appspot.com",
  messagingSenderId: "452002754304",
  appId: "1:452002754304:web:fe33ac84218e169450cde5"
};

// Initialize Firebase
initializeApp(firebaseConfig);


const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')