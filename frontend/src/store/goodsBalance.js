import instance from "@/middlewares";

export default {
  name: "goodsBalance",
  state: {
    loading: false,
    error: null,
    balances: [],
    accounts: [],
    buildings: [],
    units: [],
    counterparties: [],
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
    SET_ACCOUNTS(state, accounts) {
      state.accounts = accounts;
    },
    SET_BUILDINGS(state, buildings) {
      state.buildings = buildings;
    },
    SET_UNITS(state, units) {
      state.units = units;
    },
    SET_COUNTERPARTIES(state, counterparties) {
      state.counterparties = counterparties;
    },
    SET_DIVISIONS(state, divisions) {
      state.divisions = divisions;
    },
  },
  actions: {
    async fetchBalances({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.get("/building/balance");
        if (response.data) {
          commit("SET_BALANCES", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки остатков материалов:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return [];
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async addBalance({ commit }, balanceData) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.post("/building/balance", balanceData);
        if (response.status === 201 && response.data.balanceCardGood) {
          commit("ADD_BALANCE", response.data.balanceCardGood);
          return { success: true, balance: response.data.balanceCardGood };
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
        const response = await instance.put("/building/balance", balanceData);
        if (response.status === 200 && response.data.balanceCardGood) {
          commit("UPDATE_BALANCE", response.data.balanceCardGood);
          return { success: true, balance: response.data.balanceCardGood };
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

    async fetchCounterparties({ commit }) {
      try {
        const response = await instance.get("/g_data/counterparty");
        if (response.data) {
          commit("SET_COUNTERPARTIES", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки контрагентов:", error);
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