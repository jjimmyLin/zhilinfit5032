import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import HomePageView from './views/HomePageView.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

const app = createApp(HomePageView)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')