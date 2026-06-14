import instance from "@/middlewares";

export default {
  name: "animalBalance",
  state: {
    loading: false,
    error: null,
    balances: [],
    accounts: [],
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
        (b) => b.balance_id === updatedBalance.balance_id,
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
  },
  actions: {
    async fetchBalances({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.get("/animal/balance");
        if (response.data) {
          commit("SET_BALANCES", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки остатков животноводства:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return [];
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async addBalance({ commit }, balanceData) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.post("/animal/balance", balanceData);
        if (response.status === 201 && response.data.balanceCardAnimal) {
          commit("ADD_BALANCE", response.data.balanceCardAnimal);
          return { success: true, balance: response.data.balanceCardAnimal };
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
        const response = await instance.put("/animal/balance", balanceData);
        if (response.status === 200 && response.data.balanceCardAnimal) {
          commit("UPDATE_BALANCE", response.data.balanceCardAnimal);
          return { success: true, balance: response.data.balanceCardAnimal };
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
        const response = await instance.delete(`/animal/balance/${balanceId}`);
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
  },
  namespaced: true,
};
