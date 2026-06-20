import instance from "@/middlewares";

export default {
  name: "animalPro",
  state: {
    loading: false,
    error: null,
    registrations: [],
    offsprings: [],
    weightGains: [],
    transfers: [],
    milkings: [],
    animals: [],
    divisions: [],
    buildings: [],
    nomenclatures: [],
    accounts: [],
    movements: [],
    employees: [],
    sales: [],
    animals_group: [],
  },
  mutations: {
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },

    SET_REGISTRATIONS(state, data) {
      state.registrations = data;
    },
    ADD_REGISTRATION(state, data) {
      state.registrations.push(data);
    },
    UPDATE_REGISTRATION(state, updated) {
      const index = state.registrations.findIndex(
        (r) => r.registration_animal_id === updated.registration_animal_id,
      );
      if (index !== -1) state.registrations.splice(index, 1, updated);
    },
    REMOVE_REGISTRATION(state, id) {
      state.registrations = state.registrations.filter(
        (r) => r.registration_animal_id !== id,
      );
    },

    SET_OFFSPRINGS(state, data) {
      state.offsprings = data;
    },
    ADD_OFFSPRING(state, data) {
      state.offsprings.push(data);
    },
    UPDATE_OFFSPRING(state, updated) {
      const index = state.offsprings.findIndex(
        (o) => o.offspring_id === updated.offspring_id,
      );
      if (index !== -1) state.offsprings.splice(index, 1, updated);
    },
    REMOVE_OFFSPRING(state, id) {
      state.offsprings = state.offsprings.filter((o) => o.offspring_id !== id);
    },

    SET_WEIGHT_GAINS(state, data) {
      state.weightGains = data;
    },
    ADD_WEIGHT_GAIN(state, data) {
      state.weightGains.push(data);
    },
    UPDATE_WEIGHT_GAIN(state, updated) {
      const index = state.weightGains.findIndex(
        (w) => w.weight_gain_id === updated.weight_gain_id,
      );
      if (index !== -1) state.weightGains.splice(index, 1, updated);
    },
    REMOVE_WEIGHT_GAIN(state, id) {
      state.weightGains = state.weightGains.filter(
        (w) => w.weight_gain_id !== id,
      );
    },

    SET_TRANSFERS(state, data) {
      state.transfers = data;
    },
    ADD_TRANSFER(state, data) {
      state.transfers.push(data);
    },
    UPDATE_TRANSFER(state, updated) {
      const index = state.transfers.findIndex(
        (t) => t.animal_transfer_id === updated.animal_transfer_id,
      );
      if (index !== -1) state.transfers.splice(index, 1, updated);
    },
    REMOVE_TRANSFER(state, id) {
      state.transfers = state.transfers.filter(
        (t) => t.animal_transfer_id !== id,
      );
    },

    SET_MILKINGS(state, data) {
      state.milkings = data;
    },
    ADD_MILKING(state, data) {
      state.milkings.push(data);
    },
    UPDATE_MILKING(state, updated) {
      const index = state.milkings.findIndex(
        (m) => m.milking_id === updated.milking_id,
      );
      if (index !== -1) state.milkings.splice(index, 1, updated);
    },
    REMOVE_MILKING(state, id) {
      state.milkings = state.milkings.filter((m) => m.milking_id !== id);
    },

    SET_ANIMALS(state, data) {
      state.animals = data;
    },
    SET_DIVISIONS(state, data) {
      state.divisions = data;
    },
    SET_BUILDINGS(state, data) {
      state.buildings = data;
    },
    SET_NOMENCLATURES(state, data) {
      state.nomenclatures = data;
    },
    SET_ANIMALS_GROUP(state, data) {
      state.animals_group = data;
    },
    SET_ACCOUNTS(state, data) {
      state.accounts = data;
    },
    SET_MOVEMENTS(state, data) {
      state.movements = data;
    },
    SET_EMPLOYEES(state, data) {
      state.employees = data;
    },
    SET_COUNTERPARTIES(state, data) {
      state.counterparties = data;
    },
    SET_UNITS(state, data) {
      state.units = data;
    },

    SET_SALES(state, data) {
      state.sales = data;
    },
    ADD_SALE(state, data) {
      state.sales.push(data);
    },
    UPDATE_SALE(state, updated) {
      const index = state.sales.findIndex(
        (s) => s.product_sale_id === updated.product_sale_id,
      );
      if (index !== -1) state.sales.splice(index, 1, updated);
    },
    REMOVE_SALE(state, id) {
      state.sales = state.sales.filter((s) => s.product_sale_id !== id);
    },
  },
  actions: {
    async fetchCounterparties({ commit }) {
      try {
        const response = await instance.get("/g_data/counterparty");
        if (response.data) {
          commit("SET_COUNTERPARTIES", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка:", error);
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
        console.error("Ошибка:", error);
        return [];
      }
    },
    async fetchRegistrations({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.get("/animal/registration");
        if (response.data) {
          commit("SET_REGISTRATIONS", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки регистраций:", error);
        return [];
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async addRegistration({ commit }, data) {
      try {
        const response = await instance.post("/animal/registration", data);
        if (response.status === 201 && response.data.registrationAnimal) {
          commit("ADD_REGISTRATION", response.data.registrationAnimal);
          return { success: true, data: response.data.registrationAnimal };
        }
        return { success: false, error: "Ошибка при добавлении" };
      } catch (error) {
        console.error("Ошибка:", error);
        return {
          success: false,
          error: error.response?.data?.message || error.message,
        };
      }
    },
    async updateRegistration({ commit }, data) {
      try {
        const response = await instance.put("/animal/registration", data);
        if (response.status === 200 && response.data.registrationAnimal) {
          commit("UPDATE_REGISTRATION", response.data.registrationAnimal);
          return { success: true, data: response.data.registrationAnimal };
        }
        return { success: false, error: "Ошибка при обновлении" };
      } catch (error) {
        console.error("Ошибка:", error);
        return {
          success: false,
          error: error.response?.data?.message || error.message,
        };
      }
    },
    async saveRegistration({ dispatch }, data) {
      if (data.registration_animal_id)
        return await dispatch("updateRegistration", data);
      return await dispatch("addRegistration", data);
    },

    async fetchOffsprings({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.get("/animal/off_spring");
        if (response.data) {
          commit("SET_OFFSPRINGS", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки приплода:", error);
        return [];
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async addOffspring({ commit }, data) {
      try {
        const response = await instance.post("/animal/off_spring", data);
        if (response.status === 201 && response.data.offspring) {
          commit("ADD_OFFSPRING", response.data.offspring);
          return { success: true, data: response.data.offspring };
        }
        return { success: false, error: "Ошибка при добавлении" };
      } catch (error) {
        console.error("Ошибка:", error);
        return {
          success: false,
          error: error.response?.data?.message || error.message,
        };
      }
    },
    
    async updateOffspring({ commit }, data) {
      try {
        const response = await instance.put("/animal/off_spring", data);
        if (response.status === 200 && response.data.offspring) {
          commit("UPDATE_OFFSPRING", response.data.offspring);
          return { success: true, data: response.data.offspring };
        }
        return { success: false, error: "Ошибка при обновлении" };
      } catch (error) {
        console.error("Ошибка:", error);
        return {
          success: false,
          error: error.response?.data?.message || error.message,
        };
      }
    },
    async saveOffspring({ dispatch }, data) {
      if (data.offspring_id) return await dispatch("updateOffspring", data);
      return await dispatch("addOffspring", data);
    },

    async fetchWeightGains({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.get("/animal/weight_gain");
        if (response.data) {
          commit("SET_WEIGHT_GAINS", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки привеса:", error);
        return [];
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async addWeightGain({ commit }, data) {
      try {
        const response = await instance.post("/animal/weight_gain", data);
        if (response.status === 201 && response.data.weightGain) {
          commit("ADD_WEIGHT_GAIN", response.data.weightGain);
          return { success: true, data: response.data.weightGain };
        }
        return { success: false, error: "Ошибка при добавлении" };
      } catch (error) {
        console.error("Ошибка:", error);
        return {
          success: false,
          error: error.response?.data?.message || error.message,
        };
      }
    },
    async updateWeightGain({ commit }, data) {
      try {
        const response = await instance.put("/animal/weight_gain", data);
        if (response.status === 200 && response.data.weightGain) {
          commit("UPDATE_WEIGHT_GAIN", response.data.weightGain);
          return { success: true, data: response.data.weightGain };
        }
        return { success: false, error: "Ошибка при обновлении" };
      } catch (error) {
        console.error("Ошибка:", error);
        return {
          success: false,
          error: error.response?.data?.message || error.message,
        };
      }
    },
    async saveWeightGain({ dispatch }, data) {
      if (data.weight_gain_id) return await dispatch("updateWeightGain", data);
      return await dispatch("addWeightGain", data);
    },

    async fetchTransfers({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.get("/animal/transfer");
        if (response.data) {
          commit("SET_TRANSFERS", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки переводов:", error);
        return [];
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async addTransfer({ commit }, data) {
      try {
        const response = await instance.post("/animal/transfer", data);
        if (response.status === 201 && response.data.animalTransfer) {
          commit("ADD_TRANSFER", response.data.animalTransfer);
          return { success: true, data: response.data.animalTransfer };
        }
        return { success: false, error: "Ошибка при добавлении" };
      } catch (error) {
        console.error("Ошибка:", error);
        return {
          success: false,
          error: error.response?.data?.message || error.message,
        };
      }
    },
    async updateTransfer({ commit }, data) {
      try {
        const response = await instance.put("/animal/transfer", data);
        if (response.status === 200 && response.data.animalTransfer) {
          commit("UPDATE_TRANSFER", response.data.animalTransfer);
          return { success: true, data: response.data.animalTransfer };
        }
        return { success: false, error: "Ошибка при обновлении" };
      } catch (error) {
        console.error("Ошибка:", error);
        return {
          success: false,
          error: error.response?.data?.message || error.message,
        };
      }
    },
    async saveTransfer({ dispatch }, data) {
      if (data.animal_transfer_id)
        return await dispatch("updateTransfer", data);
      return await dispatch("addTransfer", data);
    },

    async fetchMilkings({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.get("/animal/milking");
        if (response.data) {
          commit("SET_MILKINGS", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки доек:", error);
        return [];
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async addMilking({ commit }, data) {
      try {
        const response = await instance.post("/animal/milking", data);
        if (response.status === 201 && response.data.milking) {
          commit("ADD_MILKING", response.data.milking);
          return { success: true, data: response.data.milking };
        }
        return { success: false, error: "Ошибка при добавлении" };
      } catch (error) {
        console.error("Ошибка:", error);
        return {
          success: false,
          error: error.response?.data?.message || error.message,
        };
      }
    },
    async updateMilking({ commit }, data) {
      try {
        const response = await instance.put("/animal/milking", data);
        if (response.status === 200 && response.data.milking) {
          commit("UPDATE_MILKING", response.data.milking);
          return { success: true, data: response.data.milking };
        }
        return { success: false, error: "Ошибка при обновлении" };
      } catch (error) {
        console.error("Ошибка:", error);
        return {
          success: false,
          error: error.response?.data?.message || error.message,
        };
      }
    },
    async saveMilking({ dispatch }, data) {
      if (data.milking_id) return await dispatch("updateMilking", data);
      return await dispatch("addMilking", data);
    },

    async fetchAnimals({ commit }) {
      try {
        const response = await instance.get("/animal/animal");
        if (response.data) {
          commit("SET_ANIMALS", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка:", error);
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
        console.error("Ошибка:", error);
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
        console.error("Ошибка:", error);
        return [];
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
        console.error("Ошибка:", error);
        return [];
      }
    },
    async fetchAnimals_group({ commit }) {
      try {
        const response = await instance.get("/animal/group");
        if (response.data) {
          commit("SET_ANIMALS_GROUP", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка:", error);
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
        console.error("Ошибка:", error);
        return [];
      }
    },
    async fetchMovements({ commit }) {
      try {
        const response = await instance.get("/g_data/movement");
        if (response.data) {
          commit("SET_MOVEMENTS", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка:", error);
        return [];
      }
    },
    async fetchEmployees({ commit }) {
      try {
        const response = await instance.get("/g_data/employee");
        if (response.data) {
          commit("SET_EMPLOYEES", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка:", error);
        return [];
      }
    },
    async fetchSales({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.get("/g_data/sale");
        if (response.data) {
          commit("SET_SALES", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки продаж:", error);
        return [];
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async addSale({ commit }, data) {
      try {
        const response = await instance.post("/g_data/sale", data);
        if (response.status === 201 && response.data.productSale) {
          commit("ADD_SALE", response.data.productSale);
          return { success: true, data: response.data.productSale };
        }
        return { success: false, error: "Ошибка при добавлении" };
      } catch (error) {
        console.error("Ошибка:", error);
        return {
          success: false,
          error: error.response?.data?.message || error.message,
        };
      }
    },
    async updateSale({ commit }, data) {
      try {
        const response = await instance.put("/g_data/sale", data);
        if (response.status === 200 && response.data.productSale) {
          commit("UPDATE_SALE", response.data.productSale);
          return { success: true, data: response.data.productSale };
        }
        return { success: false, error: "Ошибка при обновлении" };
      } catch (error) {
        console.error("Ошибка:", error);
        return {
          success: false,
          error: error.response?.data?.message || error.message,
        };
      }
    },
    async saveSale({ dispatch }, data) {
      if (data.product_sale_id) return await dispatch("updateSale", data);
      return await dispatch("addSale", data);
    },
  },
  namespaced: true,
};
