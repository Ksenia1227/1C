import { createStore } from "vuex";
import auth from "./auth";
// import user from "./user";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth: auth,
    // user: user,
  },
});
