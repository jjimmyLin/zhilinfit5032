import { createRouter, createWebHistory } from "vue-router";
// although I have no idea how createwebhistory use for by just follow lab5 imported...
import HomePageView from "@/views/HomePageView.vue";
import LoginView from "@/views/LoginView.vue";
import MentalHealthView from "@/views/MentalHealthView.vue";
import MyAccountView from "@/views/MyAccountView.vue";
import SuccessStoryView from "@/views/SuccessStoryView.vue";
import AboutUs from "@/views/AboutUs.vue";
import RegisterView from "@/views/RegisterView.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePageView,
  },

  {
    path: "/Login",
    name: "Login",
    component: LoginView,
  },

  {
    path: "/MentalHealth",
    name: "MentalHealth",
    component: MentalHealthView,
    children: [
      {
        path: "/SuccessStory",
        name: "SuccessStory",
        component: SuccessStoryView,
      }, //not in use at this stage just leave it...
    ],
  },
  {
    path: "/MyAccount",
    name: "MyAccount",
    component: MyAccountView,
  },
  {
    path: "/AboutUs",
    name: "AboutUs",
    component: AboutUs,
  },
  {
    path: "/Login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/Register",
    name: "Register",
    component: RegisterView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
