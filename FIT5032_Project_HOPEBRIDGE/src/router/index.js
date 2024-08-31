import { createRouter, createWebHistory } from 'vue-router'
// although I have no idea how createwebhistory use for by just follow lab5 imported...
import HomePageView from '@/views/HomePageView.vue'
import LoginView from '@/views/LoginView.vue'
import MentalHealthView from '@/views/MentalHealthView.vue'
import MyAccountView from '@/views/MyAccountView.vue'
import SuccessStoryView from '@/views/SuccessStoryView.vue'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePageView
    },

    {
        path: '/',
        name: 'Login',
        component: LoginView
    },

    {
        path: '/',
        name: 'MentalHealth',
        component: MentalHealthView
    },

    {
        path:'/',
        name: 'MyAccount',
        component: MyAccountView
    },

    {
        path:'/',
        name: 'SuccessStory',
        component: SuccessStoryView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
  })

export default router