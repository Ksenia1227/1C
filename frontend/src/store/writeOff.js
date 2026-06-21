import instance from "@/middlewares";

export default {
  name: "writeOff",
  state: {
    loading: false,
    error: null,
    fuelWriteOffs: [],
    fertilizerWriteOffs: [],
    waybills: [],
    nomenclatures: [],
    buildings: [],
  },
  mutations: {
    SET_LOADING(state, status) { state.loading = status; },
    SET_ERROR(state, error) { state.error = error; },
    
    // Топливо
    SET_FUEL_WRITE_OFFS(state, data) { state.fuelWriteOffs = data; },
    ADD_FUEL_WRITE_OFF(state, data) { state.fuelWriteOffs.push(data); },
    UPDATE_FUEL_WRITE_OFF(state, updated) {
      const index = state.fuelWriteOffs.findIndex(f => f.fuel_write_off_id === updated.fuel_write_off_id);
      if (index !== -1) state.fuelWriteOffs.splice(index, 1, updated);
    },
    REMOVE_FUEL_WRITE_OFF(state, id) {
      state.fuelWriteOffs = state.fuelWriteOffs.filter(f => f.fuel_write_off_id !== id);
    },
    
    // Удобрения
    SET_FERTILIZER_WRITE_OFFS(state, data) { state.fertilizerWriteOffs = data; },
    ADD_FERTILIZER_WRITE_OFF(state, data) { state.fertilizerWriteOffs.push(data); },
    UPDATE_FERTILIZER_WRITE_OFF(state, updated) {
      const index = state.fertilizerWriteOffs.findIndex(f => f.fertilizer_write_off_id === updated.fertilizer_write_off_id);
      if (index !== -1) state.fertilizerWriteOffs.splice(index, 1, updated);
    },
    REMOVE_FERTILIZER_WRITE_OFF(state, id) {
      state.fertilizerWriteOffs = state.fertilizerWriteOffs.filter(f => f.fertilizer_write_off_id !== id);
    },
    
    // Справочники
    SET_WAYBILLS(state, data) { state.waybills = data; },
    SET_NOMENCLATURES(state, data) { state.nomenclatures = data; },
    SET_BUILDINGS(state, data) { state.buildings = data; },
  },
  actions: {
    async fetchFuelWriteOffs({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.get("/building/fuel");
        if (response.data) {
          commit("SET_FUEL_WRITE_OFFS", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки списаний топлива:", error);
        return [];
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async addFuelWriteOff({ commit }, data) {
      try {
        const response = await instance.post("/building/fuel", data);
        if (response.status === 201 && response.data.fuelWriteOff) {
          commit("ADD_FUEL_WRITE_OFF", response.data.fuelWriteOff);
          return { success: true, data: response.data.fuelWriteOff };
        }
        return { success: false, error: "Ошибка при добавлении" };
      } catch (error) {
        console.error("Ошибка:", error);
        return { success: false, error: error.response?.data?.message || error.message };
      }
    },
    async updateFuelWriteOff({ commit }, data) {
      try {
        const response = await instance.put("/building/fuel", data);
        if (response.status === 200 && response.data.fuelWriteOff) {
          commit("UPDATE_FUEL_WRITE_OFF", response.data.fuelWriteOff);
          return { success: true, data: response.data.fuelWriteOff };
        }
        return { success: false, error: "Ошибка при обновлении" };
      } catch (error) {
        console.error("Ошибка:", error);
        return { success: false, error: error.response?.data?.message || error.message };
      }
    },
    async saveFuelWriteOff({ dispatch }, data) {
      if (data.fuel_write_off_id) return await dispatch("updateFuelWriteOff", data);
      return await dispatch("addFuelWriteOff", data);
    },

    async fetchFertilizerWriteOffs({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.get("/building/fertilizer");
        if (response.data) {
          commit("SET_FERTILIZER_WRITE_OFFS", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки списаний удобрений:", error);
        return [];
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async addFertilizerWriteOff({ commit }, data) {
      try {
        const response = await instance.post("/building/fertilizer", data);
        if (response.status === 201 && response.data.fertilizerWriteOff) {
          commit("ADD_FERTILIZER_WRITE_OFF", response.data.fertilizerWriteOff);
          return { success: true, data: response.data.fertilizerWriteOff };
        }
        return { success: false, error: "Ошибка при добавлении" };
      } catch (error) {
        console.error("Ошибка:", error);
        return { success: false, error: error.response?.data?.message || error.message };
      }
    },
    async updateFertilizerWriteOff({ commit }, data) {
      try {
        const response = await instance.put("/building/fertilizer", data);
        if (response.status === 200 && response.data.fertilizerWriteOff) {
          commit("UPDATE_FERTILIZER_WRITE_OFF", response.data.fertilizerWriteOff);
          return { success: true, data: response.data.fertilizerWriteOff };
        }
        return { success: false, error: "Ошибка при обновлении" };
      } catch (error) {
        console.error("Ошибка:", error);
        return { success: false, error: error.response?.data?.message || error.message };
      }
    },
    async saveFertilizerWriteOff({ dispatch }, data) {
      if (data.fertilizer_write_off_id) return await dispatch("updateFertilizerWriteOff", data);
      return await dispatch("addFertilizerWriteOff", data);
    },

    async fetchWaybills({ commit }) {
      try {
        const response = await instance.get("/building/waybill");
        if (response.data) { commit("SET_WAYBILLS", response.data); return response.data; }
        return [];
      } catch (error) { console.error("Ошибка:", error); return []; }
    },
    async fetchNomenclatures({ commit }) {
      try {
        const response = await instance.get("/g_data/nomeclature");
        if (response.data) { commit("SET_NOMENCLATURES", response.data); return response.data; }
        return [];
      } catch (error) { console.error("Ошибка:", error); return []; }
    },
    async fetchBuildings({ commit }) {
      try {
        const response = await instance.get("/building/building");
        if (response.data) { commit("SET_BUILDINGS", response.data); return response.data; }
        return [];
      } catch (error) { console.error("Ошибка:", error); return []; }
    },
  },
  namespaced: true,
};