import instance from "@/middlewares";

export default {
  name: "counterparty",
  state: {
    loading: false,
    error: null,
    counterparties: [],
  },
  getters: {},
  mutations: {
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_COUNTERPARTIES(state, counterparties) {
      state.counterparties = counterparties;
    },
    ADD_COUNTERPARTY(state, counterparty) {
      state.counterparties.push(counterparty);
    },
    UPDATE_COUNTERPARTY(state, updatedCounterparty) {
      const index = state.counterparties.findIndex(
        c => c.counterparty_id === updatedCounterparty.counterparty_id
      );
      if (index !== -1) {
        state.counterparties.splice(index, 1, updatedCounterparty);
      }
    },
    REMOVE_COUNTERPARTY(state, counterpartyId) {
      state.counterparties = state.counterparties.filter(
        c => c.counterparty_id !== counterpartyId
      );
    },
  },
  actions: {
    async fetchCounterparties({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.get("/g_data/counterparty");
        if (response.data) {
          commit("SET_COUNTERPARTIES", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки контрагентов:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return [];
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async addCounterparty({ commit }, counterpartyData) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.post("/g_data/counterparty", counterpartyData);
        if (response.status === 201 && response.data.counterparty) {
          commit("ADD_COUNTERPARTY", response.data.counterparty);
          return { success: true, counterparty: response.data.counterparty };
        }
        return { success: false, error: "Ошибка при добавлении" };
      } catch (error) {
        console.error("Ошибка при добавлении контрагента:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return { success: false, error: error.response?.data?.message || error.message };
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async updateCounterparty({ commit }, counterpartyData) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.put("/g_data/counterparty", counterpartyData);
        if (response.status === 200 && response.data.counterparty) {
          commit("UPDATE_COUNTERPARTY", response.data.counterparty);
          return { success: true, counterparty: response.data.counterparty };
        }
        return { success: false, error: "Ошибка при обновлении" };
      } catch (error) {
        console.error("Ошибка при обновлении контрагента:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return { success: false, error: error.response?.data?.message || error.message };
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async saveCounterparty({ dispatch }, counterpartyData) {
      if (counterpartyData.counterparty_id) {
        return await dispatch("updateCounterparty", counterpartyData);
      } else {
        return await dispatch("addCounterparty", counterpartyData);
      }
    },
  },
  namespaced: true,
};