import instance from "@/middlewares";

export default {
  name: "goodsReceipt",
  state: {
    loading: false,
    error: null,
    receipts: [],
    counterparties: [],
    buildings: [],
    movements: [],
    nomenclatures: [],
    accounts: [],
  },
  mutations: {
    SET_LOADING(state, status) { state.loading = status; },
    SET_ERROR(state, error) { state.error = error; },
    SET_RECEIPTS(state, data) { state.receipts = data; },
    ADD_RECEIPT(state, data) { state.receipts.push(data); },
    UPDATE_RECEIPT(state, updated) {
      const index = state.receipts.findIndex(r => r.goods_receipt_id === updated.goods_receipt_id);
      if (index !== -1) state.receipts.splice(index, 1, updated);
    },
    REMOVE_RECEIPT(state, id) {
      state.receipts = state.receipts.filter(r => r.goods_receipt_id !== id);
    },
    SET_COUNTERPARTIES(state, data) { state.counterparties = data; },
    SET_BUILDINGS(state, data) { state.buildings = data; },
    SET_MOVEMENTS(state, data) { state.movements = data; },
    SET_NOMENCLATURES(state, data) { state.nomenclatures = data; },
    SET_ACCOUNTS(state, data) { state.accounts = data; },
  },
  actions: {
    async fetchReceipts({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.get("/g_data/receipt");
        if (response.data) {
          commit("SET_RECEIPTS", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки оприходований:", error);
        return [];
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async addReceipt({ commit }, data) {
      try {
        const response = await instance.post("/g_data/receipt", data);
        if (response.status === 201 && response.data.goodsReceipt) {
          commit("ADD_RECEIPT", response.data.goodsReceipt);
          return { success: true, data: response.data.goodsReceipt };
        }
        return { success: false, error: "Ошибка при добавлении" };
      } catch (error) {
        console.error("Ошибка:", error);
        return { success: false, error: error.response?.data?.message || error.message };
      }
    },
    async updateReceipt({ commit }, data) {
      try {
        const response = await instance.put("/g_data/receipt", data);
        if (response.status === 200 && response.data.goodsReceipt) {
          commit("UPDATE_RECEIPT", response.data.goodsReceipt);
          return { success: true, data: response.data.goodsReceipt };
        }
        return { success: false, error: "Ошибка при обновлении" };
      } catch (error) {
        console.error("Ошибка:", error);
        return { success: false, error: error.response?.data?.message || error.message };
      }
    },
    async saveReceipt({ dispatch }, data) {
      if (data.goods_receipt_id) return await dispatch("updateReceipt", data);
      return await dispatch("addReceipt", data);
    },
    async fetchCounterparties({ commit }) {
      try {
        const response = await instance.get("/g_data/counterparty");
        if (response.data) { commit("SET_COUNTERPARTIES", response.data); return response.data; }
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
    async fetchMovements({ commit }) {
      try {
        const response = await instance.get("/g_data/movement");
        if (response.data) { commit("SET_MOVEMENTS", response.data); return response.data; }
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
    async fetchAccounts({ commit }) {
      try {
        const response = await instance.get("/g_data/account");
        if (response.data) { commit("SET_ACCOUNTS", response.data); return response.data; }
        return [];
      } catch (error) { console.error("Ошибка:", error); return []; }
    },
  },
  namespaced: true,
};