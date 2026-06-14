import instance from "@/middlewares";

export default {
  name: "plantBalance",
  state: {
    loading: false,
    error: null,
    balances: [],
    nomenclatures: [],
    accounts: [],
    buildings: [],
    units: [],
    divisions: [],
  },
  mutations: {
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_BALANCES(state, balances) {
      state.balances = balances;
    },
    ADD_BALANCE(state, balance) {
      state.balances.push(balance);
    },
    UPDATE_BALANCE(state, updatedBalance) {
      const index = state.balances.findIndex(
        (b) => b.balance_id === updatedBalance.balance_id
      );
      if (index !== -1) {
        state.balances.splice(index, 1, updatedBalance);
      }
    },
    REMOVE_BALANCE(state, balanceId) {
      state.balances = state.balances.filter((b) => b.balance_id !== balanceId);
    },
    SET_NOMENCLATURES(state, nomenclatures) {
      state.nomenclatures = nomenclatures;
    },
    SET_ACCOUNTS(state, accounts) {
      state.accounts = accounts;
    },
    SET_BUILDINGS(state, buildings) {
      state.buildings = buildings;
    },
    SET_UNITS(state, units) {
      state.units = units;
    },
    SET_DIVISIONS(state, divisions) {
      state.divisions = divisions;
    },
  },
  actions: {
    async fetchBalances({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.get("/plants/balance");
        if (response.data) {
          commit("SET_BALANCES", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки остатков растениеводства:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return [];
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async addBalance({ commit }, balanceData) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.post("/plants/balance", balanceData);
        if (response.status === 201 && response.data.balanceCardPlant) {
          commit("ADD_BALANCE", response.data.balanceCardPlant);
          return { success: true, balance: response.data.balanceCardPlant };
        }
        return { success: false, error: "Ошибка при добавлении" };
      } catch (error) {
        console.error("Ошибка при добавлении остатка:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return {
          success: false,
          error: error.response?.data?.message || error.message,
        };
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async updateBalance({ commit }, balanceData) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.put("/plants/balance", balanceData);
        if (response.status === 200 && response.data.balanceCardPlant) {
          commit("UPDATE_BALANCE", response.data.balanceCardPlant);
          return { success: true, balance: response.data.balanceCardPlant };
        }
        return { success: false, error: "Ошибка при обновлении" };
      } catch (error) {
        console.error("Ошибка при обновлении остатка:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return {
          success: false,
          error: error.response?.data?.message || error.message,
        };
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async saveBalance({ dispatch }, balanceData) {
      if (balanceData.balance_id) {
        return await dispatch("updateBalance", balanceData);
      } else {
        return await dispatch("addBalance", balanceData);
      }
    },

    async deleteBalance({ commit }, balanceId) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.delete(`/plant/balance/${balanceId}`);
        if (response.status === 200) {
          commit("REMOVE_BALANCE", balanceId);
          return { success: true };
        }
        return { success: false, error: "Ошибка при удалении" };
      } catch (error) {
        console.error("Ошибка при удалении остатка:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return {
          success: false,
          error: error.response?.data?.message || error.message,
        };
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async fetchNomenclatures({ commit }) {
      try {
        const response = await instance.get("/g_data/nomeclature");
        if (response.data) {
          commit("SET_NOMENCLATURES", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки номенклатуры:", error);
        return [];
      }
    },

    async fetchAccounts({ commit }) {
      try {
        const response = await instance.get("/g_data/account");
        if (response.data) {
          commit("SET_ACCOUNTS", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки счетов:", error);
        return [];
      }
    },

    async fetchBuildings({ commit }) {
      try {
        const response = await instance.get("/building/building");
        if (response.data) {
          commit("SET_BUILDINGS", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки зданий:", error);
        return [];
      }
    },

    async fetchUnits({ commit }) {
      try {
        const response = await instance.get("/g_data/unit");
        if (response.data) {
          commit("SET_UNITS", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки единиц измерения:", error);
        return [];
      }
    },

    async fetchDivisions({ commit }) {
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