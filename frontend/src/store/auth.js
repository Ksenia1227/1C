import instance from "@/middlewares";
import router from "@/router";
import { jwtDecode } from "jwt-decode";

const checkStatuses = (status) => {
  switch (status) {
    case 400:
      window.alert("Пароль должен содержать минимум 8 символов, включая латинские буквы, цифры и спецсимволы @$!%*?&");
      return false;
    case 403:
      window.alert("Пользователь не авторизован");
      return false;
    case 404:
      window.alert("Пользователь не найден");
      return false;
    case 409:
      window.alert("Email уже используется");
      return false;
    case 414:
      window.alert("Пароль неверный");
      return false;
    case 500:
      window.alert("Проблема на сервере");
      return false;
    default:
      return true;
  }
};

export default {
  name: "auth",
  state: () => ({
    isAuth: false,
    isModerator: false,
  }),
  getters: {},
  mutations: {
    setAuth(state, isAuth) {
      state.isAuth = isAuth;
    },
    setModerator(state, isModerator) {
      state.isModerator = isModerator;
    },
  },
  actions: {
    async registr(_, { endpoint, formData }) {
      const response = await fetch(
        `${process.env.VUE_APP_SERVER}/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );
      if (!checkStatuses(response.status)) return;
      window.alert("Вы зарегистрированы");
      router.push("/login");
      return;
    },
    async login({ commit }, { email, password }) {
      const response = await fetch(
        `${process.env.VUE_APP_SERVER}/api/auth/signin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json;charset=utf-8" },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      if (!checkStatuses(response.status)) return;
      const data = await response.json();
      commit("setAuth", true);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("uid", data.uid);

      const decodedToken = jwtDecode(data.accessToken);
      const role = decodedToken.role;
      commit("setModerator", role === "moderator");
      localStorage.setItem("role", role);

      router.push("/");
      return;
    },
    logout({ commit }) {
      commit("setAuth", false);
      commit("setModerator", false);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("uid");
      localStorage.removeItem("role");
      router.push("/");
    },
    async changeAccess() {
      const response = await instance.post(
        "/api/auth/change-access",
        {},
        {
          headers: {
            "x-refresh-token": localStorage.getItem("refreshToken"),
          },
        }
      );
      if (!checkStatuses(response.status)) return;
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      return;
    },
  },
  namespaced: true,
};
