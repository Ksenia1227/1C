import { createStore } from "vuex";
import auth from "./auth";
// import user from "./user";
import generator from "./generator"
import organization from "./organization";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth: auth,
    // user: user,
    generator: generator,
    organization: organization
  },
});
