import instance from "@/middlewares";

export default {
  name: "employeeContract",
  state: {
    loading: false,
    error: null,
    contracts: [],
  },
  mutations: {
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_CONTRACTS(state, contracts) {
      state.contracts = contracts;
    },
    ADD_CONTRACT(state, contract) {
      state.contracts.push(contract);
    },
    UPDATE_CONTRACT(state, updatedContract) {
      const index = state.contracts.findIndex(
        c => c.contract_id === updatedContract.contract_id
      );
      if (index !== -1) {
        state.contracts.splice(index, 1, updatedContract);
      }
    },
    REMOVE_CONTRACT(state, contractId) {
      state.contracts = state.contracts.filter(
        c => c.contract_id !== contractId
      );
    },
  },
  actions: {
    async fetchEmployeeContracts({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.get("/g_data/c_employee");
        if (response.data) {
          commit("SET_CONTRACTS", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки договоров сотрудников:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return [];
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async addEmployeeContract({ commit }, contractData) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.post("/g_data/c_employee", contractData);
        if (response.status === 201 && response.data.contract) {
          commit("ADD_CONTRACT", response.data.contract);
          return { success: true, contract: response.data.contract };
        }
        return { success: false, error: "Ошибка при добавлении" };
      } catch (error) {
        console.error("Ошибка при добавлении договора:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return { success: false, error: error.response?.data?.message || error.message };
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async updateEmployeeContract({ commit }, contractData) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.put("/g_data/c_employee", contractData);
        if (response.status === 200 && response.data.c_employee) {
          commit("UPDATE_CONTRACT", response.data.c_employee);
          return { success: true, contract: response.data.c_employee };
        }
        return { success: false, error: "Ошибка при обновлении" };
      } catch (error) {
        console.error("Ошибка при обновлении договора:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return { success: false, error: error.response?.data?.message || error.message };
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async saveEmployeeContract({ dispatch }, contractData) {
      if (contractData.contract_id) {
        return await dispatch("updateEmployeeContract", contractData);
      } else {
        return await dispatch("addEmployeeContract", contractData);
      }
    },

    async deleteEmployeeContract({ commit }, contractId) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.delete(`/c_employee/${contractId}`);
        if (response.status === 200) {
          commit("REMOVE_CONTRACT", contractId);
          return { success: true };
        }
        return { success: false, error: "Ошибка при удалении" };
      } catch (error) {
        console.error("Ошибка при удалении договора:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return { success: false, error: error.response?.data?.message || error.message };
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
  namespaced: true,
};