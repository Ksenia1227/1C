import instance from "@/middlewares";

export default {
  name: "waybill",
  state: {
    loading: false,
    error: null,
    waybills: [],
    divisions: [],
    employees: [],
    fixedAssets: [],
    workTypes: [],
    structureAcreages: [],
    units: [],
    accounts: [],
  },
  mutations: {
    SET_LOADING(state, status) { state.loading = status; },
    SET_ERROR(state, error) { state.error = error; },
    SET_WAYBILLS(state, data) { state.waybills = data; },
    ADD_WAYBILL(state, data) { state.waybills.push(data); },
    UPDATE_WAYBILL(state, updated) {
      const index = state.waybills.findIndex(w => w.waybill_id === updated.waybill_id);
      if (index !== -1) state.waybills.splice(index, 1, updated);
    },
    REMOVE_WAYBILL(state, id) {
      state.waybills = state.waybills.filter(w => w.waybill_id !== id);
    },
    SET_DIVISIONS(state, data) { state.divisions = data; },
    SET_EMPLOYEES(state, data) { state.employees = data; },
    SET_FIXED_ASSETS(state, data) { state.fixedAssets = data; },
    SET_WORK_TYPES(state, data) { state.workTypes = data; },
    SET_STRUCTURE_ACREAGES(state, data) { state.structureAcreages = data; },
    SET_UNITS(state, data) { state.units = data; },
    SET_ACCOUNTS(state, data) { state.accounts = data; },
  },
  actions: {
    async fetchWaybills({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.get("/building/wayBill");
        if (response.data) {
          commit("SET_WAYBILLS", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки путевых листов:", error);
        return [];
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async addWaybill({ commit }, data) {
      try {
        const response = await instance.post("/building/wayBill", data);
        if (response.status === 201 && response.data.waybill) {
          commit("ADD_WAYBILL", response.data.waybill);
          return { success: true, data: response.data.waybill };
        }
        return { success: false, error: "Ошибка при добавлении" };
      } catch (error) {
        console.error("Ошибка:", error);
        return { success: false, error: error.response?.data?.message || error.message };
      }
    },
    async updateWaybill({ commit }, data) {
      try {
        const response = await instance.put("/building/wayBill", data);
        if (response.status === 200 && response.data.waybill) {
          commit("UPDATE_WAYBILL", response.data.waybill);
          return { success: true, data: response.data.waybill };
        }
        return { success: false, error: "Ошибка при обновлении" };
      } catch (error) {
        console.error("Ошибка:", error);
        return { success: false, error: error.response?.data?.message || error.message };
      }
    },
    async saveWaybill({ dispatch }, data) {
      if (data.waybill_id) return await dispatch("updateWaybill", data);
      return await dispatch("addWaybill", data);
    },
    async fetchDivisions({ commit }) {
      try {
        const response = await instance.get("/g_data/division");
        if (response.data) { commit("SET_DIVISIONS", response.data); return response.data; }
        return [];
      } catch (error) { console.error("Ошибка:", error); return []; }
    },
    async fetchEmployees({ commit }) {
      try {
        const response = await instance.get("/g_data/employee");
        if (response.data) { commit("SET_EMPLOYEES", response.data); return response.data; }
        return [];
      } catch (error) { console.error("Ошибка:", error); return []; }
    },
    async fetchFixedAssets({ commit }) {
      try {
        const response = await instance.get("building/assets");
        if (response.data) { commit("SET_FIXED_ASSETS", response.data); return response.data; }
        return [];
      } catch (error) { console.error("Ошибка:", error); return []; }
    },
    async fetchWorkTypes({ commit }) {
      try {
        const response = await instance.get("/g_data/work_type");
        if (response.data) { commit("SET_WORK_TYPES", response.data); return response.data; }
        return [];
      } catch (error) { console.error("Ошибка:", error); return []; }
    },
    async fetchStructureAcreages({ commit }) {
      try {
        const response = await instance.get("/plants/structure");
        if (response.data) { commit("SET_STRUCTURE_ACREAGES", response.data); return response.data; }
        return [];
      } catch (error) { console.error("Ошибка:", error); return []; }
    },
    async fetchUnits({ commit }) {
      try {
        const response = await instance.get("/g_data/unit");
        if (response.data) { commit("SET_UNITS", response.data); return response.data; }
        return [];
      } catch (error) { console.error("Ошибка:", error); return []; }
    },
    async fetchAccounts({ commit }) {
      try {
        const response = await instance.get("/g_data/account");
        if (response.data) { commit("SET_ACCOUNTS", response.data); return response.data; }
        return [];
      } catch (error) { console.error("Ошибка:", error); return []; }
    },
  },
  namespaced: true,
};