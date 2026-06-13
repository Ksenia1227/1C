import { createStore } from "vuex";
import auth from "./auth";
// import user from "./user";
import generator from "./generator"
import organization from "./organization";
import counterparty from "./counterparty";
import contract from "./contract";
import employee from "./employee";
import employeeContract from "./employeeContract";
import building from "./building";
import fixedAsset from "./fixedAsset";
import crop from "./crop";
import structure from "./structure";
import livestock from "./livestock";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth: auth,
    // user: user,
    generator: generator,
    organization: organization,
    counterparty: counterparty,
    contract: contract,
    employee: employee,
    employeeContract: employeeContract,
    building: building,
    fixedAsset: fixedAsset,
    crop: crop,
    structure: structure,
    livestock: livestock
  },
});
