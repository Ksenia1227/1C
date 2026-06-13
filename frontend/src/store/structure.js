import instance from "@/middlewares";

export default {
  name: "structure",
  state: {
    loading: false,
    error: null,
    structures: [],
    fields: [],
    crops: [],
    divisions: [],
  },
  mutations: {
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_STRUCTURES(state, structures) {
      state.structures = structures;
    },
    ADD_STRUCTURE(state, structure) {
      state.structures.push(structure);
    },
    UPDATE_STRUCTURE(state, updatedStructure) {
      const index = state.structures.findIndex(s => s.structure_acreage_id === updatedStructure.structure_acreage_id);
      if (index !== -1) {
        state.structures.splice(index, 1, updatedStructure);
      }
    },
    REMOVE_STRUCTURE(state, structureId) {
      state.structures = state.structures.filter(s => s.structure_acreage_id !== structureId);
    },
    SET_FIELDS(state, fields) {
      state.fields = fields;
    },
    SET_CROPS(state, crops) {
      state.crops = crops;
    },
    SET_DIVISIONS(state, divisions) {
      state.divisions = divisions;
    },
  },
  actions: {
    async fetchStructures({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.get("/plants/structure");
        if (response.data) {
          commit("SET_STRUCTURES", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки структуры посевов:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return [];
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async addStructure({ commit }, structureData) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.post("/plants/structure", structureData);
        if (response.status === 201 && response.data.structureAcreage) {
          commit("ADD_STRUCTURE", response.data.structureAcreage);
          return { success: true, structure: response.data.structureAcreage };
        }
        return { success: false, error: "Ошибка при добавлении" };
      } catch (error) {
        console.error("Ошибка при добавлении структуры посевов:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return { success: false, error: error.response?.data?.message || error.message };
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async updateStructure({ commit }, structureData) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.put("/plants/structure", structureData);
        if (response.status === 200 && response.data.structureAcreage) {
          commit("UPDATE_STRUCTURE", response.data.structureAcreage);
          return { success: true, structure: response.data.structureAcreage };
        }
        return { success: false, error: "Ошибка при обновлении" };
      } catch (error) {
        console.error("Ошибка при обновлении структуры посевов:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return { success: false, error: error.response?.data?.message || error.message };
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async saveStructure({ dispatch }, structureData) {
      if (structureData.structure_acreage_id) {
        return await dispatch("updateStructure", structureData);
      } else {
        return await dispatch("addStructure", structureData);
      }
    },

    async fetchFieldsForStructure({ commit }) {
      try {
        const response = await instance.get("/plants/field");
        if (response.data) {
          commit("SET_FIELDS", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки полей:", error);
        return [];
      }
    },

    async fetchCropsForStructure({ commit }) {
      try {
        const response = await instance.get("/plants/crop");
        if (response.data) {
          commit("SET_CROPS", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки культур:", error);
        return [];
      }
    },

    async fetchDivisionsForStructure({ commit }) {
      try {
        const response = await instance.get("/g_data/division");
        if (response.data) {
          commit("SET_DIVISIONS", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки подразделений:", error);
        return [];
      }
    },
  },
  namespaced: true,
};