import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomePage.vue";
import Registeration from "@/views/RegistrationPage.vue";
import Login from "@/views/LoginPage.vue";
import Practice from "@/views/PracticePage.vue";
// import instance from "@/middlewares";

const routes = [
  { path: "/", component: Home },
  { path: "/register", component: Registeration },
  { path: "/login", component: Login },
  { path: "/practice", component: Practice },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   try {
//     const requireModerator = to.matched.some(
//       (record) => record?.meta.moderator
//     );
//     if (requireModerator) {
//       const response = await instance.get("/api/publications/pending");
//       if (response.status == 200) {
//         return next();
//       } else if (response.status == 403) {
//         console.error("Ошибка авторизации:", error);
//         return next("/login");
//       }
//     }
//     return next();
//   } catch (error) {
//     return next("/login");
//   }
// });

export default router;
