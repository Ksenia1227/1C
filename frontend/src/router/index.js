import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomePage.vue";
import Registeration from "@/views/RegistrationPage.vue";
import Login from "@/views/LoginPage.vue";
import Practice from "@/views/PracticePage.vue";
import Form from "@/views/FormPage.vue";
import Form1 from "@/views/FormPage1.vue";
import Form2 from "@/views/FormPage2.vue";
import Form3 from "@/views/FormPage3.vue";
import Form4 from "@/views/FormPage4.vue";
// import instance from "@/middlewares";

const routes = [
  { path: "/", component: Home },
  { path: "/register", component: Registeration },
  { path: "/login", component: Login },
  { path: "/practice", component: Practice },
  { path: "/form", component: Form },
  { path: "/form1", component: Form1 },
  { path: "/form2", component: Form2 },
  { path: "/form3", component: Form3 },
  { path: "/form4", component: Form4 }
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
