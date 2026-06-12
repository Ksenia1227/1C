import instance from "@/middlewares";

export default {
  name: "counterparty",
  state: {
    loading: false,
    error: null,
    counterparties: [],
    contracts: [],
  },
  getters: {
    getCounterpartyById: (state) => (id) => {
      return state.counterparties.find(c => c.counterparty_id === id);
    },
    getContractsByCounterpartyId: (state) => (id) => {
      return state.contracts.filter(c => c.counterparty_id === id);
    }
  },
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
    SET_CONTRACTS(state, contracts) {
      state.contracts = contracts;
    },
    ADD_COUNTERPARTY(state, counterparty) {
      state.counterparties.push(counterparty);
    },
    UPDATE_COUNTERPARTY(state, updatedCounterparty) {
      const index = state.counterparties.findIndex(c => c.counterparty_id === updatedCounterparty.counterparty_id);
      if (index !== -1) {
        state.counterparties.splice(index, 1, updatedCounterparty);
      }
    },
    ADD_CONTRACT(state, contract) {
      state.contracts.push(contract);
    },
    UPDATE_CONTRACT(state, updatedContract) {
      const index = state.contracts.findIndex(c => c.contract_id === updatedContract.contract_id);
      if (index !== -1) {
        state.contracts.splice(index, 1, updatedContract);
      }
    },
    REMOVE_CONTRACT(state, contractId) {
      const index = state.contracts.findIndex(c => c.contract_id === contractId);
      if (index !== -1) {
        state.contracts.splice(index, 1);
      }
    }
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
        commit("SET_ERROR", error.response?.data?.message || "Ошибка загрузки");
        return [];
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async fetchContracts({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.get("/g_data/c_counterparty");
        if (response.data) {
          commit("SET_CONTRACTS", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки договоров:", error);
        commit("SET_ERROR", error.response?.data?.message || "Ошибка загрузки");
        return [];
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async saveCounterpartyWithContracts({ commit, dispatch }, formData) {  // Убрали state
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      
      console.log("=== Начало сохранения ===");
      console.log("formData:", formData);
      
      try {
        let counterpartyId;
        
        // 1. Сохраняем контрагента
        if (formData.counterparty.counterparty_id) {
          console.log("Обновляем существующего контрагента:", formData.counterparty.counterparty_id);
          const response = await instance.put("/g_data/counterparty", formData.counterparty);
          console.log("Ответ при обновлении контрагента:", response.data);
          counterpartyId = formData.counterparty.counterparty_id;
          commit("UPDATE_COUNTERPARTY", response.data.counterparty);
        } else {
          console.log("Создаем нового контрагента");
          const response = await instance.post("/g_data/counterparty", formData.counterparty);
          console.log("Ответ при создании контрагента:", response.data);
          counterpartyId = response.data.counterparty.counterparty_id;
          commit("ADD_COUNTERPARTY", response.data.counterparty);
        }
        
        console.log("ID контрагента:", counterpartyId);
        
        // 2. Сохраняем договоры
        const newContracts = formData.contracts || [];
        console.log("Договоры для сохранения:", newContracts);
        
        let savedContractsCount = 0;
        let createdContracts = 0;
        let updatedContracts = 0;
        
        for (let i = 0; i < newContracts.length; i++) {
          const contract = newContracts[i];
          console.log(`Обработка договора ${i + 1}:`, contract);
          
          if (!contract.name || !contract.name.trim()) {
            console.log(`Договор ${i + 1} пропущен: нет названия`);
            continue;
          }
          
          try {
            let contractResponse;
            
            if (contract.contract_id) {
              console.log(`Обновляем договор ${contract.contract_id}`);
              const contractData = {
                contract_id: contract.contract_id,
                contract_type_id: contract.contract_type_id,
                name: contract.name,
                date: contract.date,
                validity_period: contract.validity_period,
                counterparty_id: counterpartyId
              };
              contractResponse = await instance.put("/g_data/c_counterparty", contractData);
              console.log(`Ответ при обновлении договора:`, contractResponse.data);
              
              if (contractResponse.data && contractResponse.data.c_counterparty) {
                commit("UPDATE_CONTRACT", contractResponse.data.c_counterparty);
              }
              updatedContracts++;
            } else {
              console.log(`Создаем НОВЫЙ договор для контрагента ${counterpartyId}`);
              const contractData = {
                contract_type_id: contract.contract_type_id,
                name: contract.name,
                date: contract.date,
                validity_period: contract.validity_period,
                counterparty_id: counterpartyId
              };
              contractResponse = await instance.post("/g_data/c_counterparty", contractData);
              console.log(`Ответ при создании договора:`, contractResponse.data);
              
              if (contractResponse.data && contractResponse.data.contract) {
                commit("ADD_CONTRACT", contractResponse.data.contract);
              }
              createdContracts++;
            }
            savedContractsCount++;
            
          } catch (contractError) {
            console.error(`Ошибка при сохранении договора ${i + 1}:`, contractError);
            console.error("Детали ошибки:", contractError.response?.data);
            throw new Error(`Ошибка сохранения договора: ${contractError.response?.data?.message || contractError.message}`);
          }
        }
        
        console.log(`Результат: создано ${createdContracts}, обновлено ${updatedContracts}, всего ${savedContractsCount} из ${newContracts.length}`);
        
        await dispatch("fetchCounterparties");
        await dispatch("fetchContracts");
        
        alert(`Данные успешно сохранены. ${createdContracts > 0 ? `Добавлено договоров: ${createdContracts}. ` : ''}${updatedContracts > 0 ? `Обновлено договоров: ${updatedContracts}.` : ''}`);
        return true;
        
      } catch (error) {
        console.error("!!! ОШИБКА ПРИ СОХРАНЕНИИ !!!", error);
        const errorMessage = error.response?.data?.message || error.message || "Произошла ошибка при сохранении данных";
        commit("SET_ERROR", errorMessage);
        alert(`Ошибка: ${errorMessage}`);
        return false;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async deleteCounterparty({ commit }, counterpartyId) {
      commit("SET_LOADING", true);
      try {
        // Здесь логика удаления
        console.log("Удаление контрагента:", counterpartyId);
        commit("SET_COUNTERPARTIES", []);
        alert("Контрагент удален");
        return true;
      } catch (error) {
        console.error("Ошибка удаления:", error);
        alert(error.response?.data?.message || "Ошибка удаления");
        return false;
      } finally {
        commit("SET_LOADING", false);
      }
    }
  },
  namespaced: true,
};