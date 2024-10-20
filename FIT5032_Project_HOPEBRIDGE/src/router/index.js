/*This file imports all pages required for navigation and gives their path, parent/chilren ... infos,
then the router is exported to be used by other files*/ 

import { createRouter, createWebHistory } from "vue-router";
// although I have no idea how createwebhistory use for by just follow lab5 imported...
import HomePageView from "@/views/HomePageView.vue";
import LoginView from "@/views/LoginView.vue";
import MentalHealthView from "@/views/MentalHealthView.vue";
import MyAccountView from "@/views/MyAccountView.vue";
import SuccessStoryView from "@/views/SuccessStoryView.vue";
import Financialhelp from "@/views/Financialhelp.vue";
import RegisterView from "@/views/RegisterView.vue";
import StresstestView from "@/views/StresstestView.vue";
import JobView from "@/views/JobView.vue";
import InstituteList from "@/views/InstituteList.vue";

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
        path: "SuccessStory",
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
    path: "/Financialhelp",
    name: "Financialhelp",
    component: Financialhelp,
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

  {
    path: "/Stresstest",
    name: "Stresstest",
    component: StresstestView,
  },

  {
    path: "/Job",
    name: "Job",
    component: JobView,
  },
  {
    path: "/InstituteList",
    name: "InstituteList",
    component: InstituteList,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL || '/'),
  routes,
});

export default router;
