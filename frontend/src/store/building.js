import instance from "@/middlewares";

export default {
  name: "building",
  state: {
    loading: false,
    error: null,
    buildings: [],
  },
  mutations: {
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_BUILDINGS(state, buildings) {
      state.buildings = buildings;
    },
    ADD_BUILDING(state, building) {
      state.buildings.push(building);
    },
    UPDATE_BUILDING(state, updatedBuilding) {
      const index = state.buildings.findIndex(
        b => b.building_id === updatedBuilding.building_id
      );
      if (index !== -1) {
        state.buildings.splice(index, 1, updatedBuilding);
      }
    },
    REMOVE_BUILDING(state, buildingId) {
      state.buildings = state.buildings.filter(
        b => b.building_id !== buildingId
      );
    },
  },
  actions: {
    async fetchBuildings({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.get("/building/building");
        if (response.data) {
          commit("SET_BUILDINGS", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки зданий:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return [];
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async addBuilding({ commit }, buildingData) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.post("/building/building", buildingData);
        if (response.status === 201 && response.data.building) {
          commit("ADD_BUILDING", response.data.building);
          return { success: true, building: response.data.building };
        }
        return { success: false, error: "Ошибка при добавлении" };
      } catch (error) {
        console.error("Ошибка при добавлении здания:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return { success: false, error: error.response?.data?.message || error.message };
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async updateBuilding({ commit }, buildingData) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.put("/building/building", buildingData);
        if (response.status === 200 && response.data.building) {
          commit("UPDATE_BUILDING", response.data.building);
          return { success: true, building: response.data.building };
        }
        return { success: false, error: "Ошибка при обновлении" };
      } catch (error) {
        console.error("Ошибка при обновлении здания:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return { success: false, error: error.response?.data?.message || error.message };
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async saveBuilding({ dispatch }, buildingData) {
      if (buildingData.building_id) {
        return await dispatch("updateBuilding", buildingData);
      } else {
        return await dispatch("addBuilding", buildingData);
      }
    },

    async deleteBuilding({ commit }, buildingId) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.delete(`/building/${buildingId}`);
        if (response.status === 200) {
          commit("REMOVE_BUILDING", buildingId);
          return { success: true };
        }
        return { success: false, error: "Ошибка при удалении" };
      } catch (error) {
        console.error("Ошибка при удалении здания:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return { success: false, error: error.response?.data?.message || error.message };
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
  namespaced: true,
};