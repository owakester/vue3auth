import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "./store/user";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import AnswerQuestion from "./views/AnswerQuestion.vue";

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore();
  userStore.loadingSession=true
  const user = await userStore.currentUser();
  if (user) {
    next();
  } else {
    next("/login");
  }
  userStore.loadingSession=false
};

let routes = [
  { path: "/", component: Home, beforeEnter: requireAuth },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  {
    path: "/questions",component: AnswerQuestion, beforeEnter: requireAuth
   
  },
];

let router = createRouter({
  routes,
  history: createWebHistory(),
});



export default router;
