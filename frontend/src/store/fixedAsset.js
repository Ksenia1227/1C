import instance from "@/middlewares";

export default {
  name: "fixedAsset",
  state: {
    loading: false,
    error: null,
    assets: [],
  },
  mutations: {
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_ASSETS(state, assets) {
      state.assets = assets;
    },
    ADD_ASSET(state, asset) {
      state.assets.push(asset);
    },
    UPDATE_ASSET(state, updatedAsset) {
      const index = state.assets.findIndex(
        a => a.fixed_asset_id === updatedAsset.fixed_asset_id
      );
      if (index !== -1) {
        state.assets.splice(index, 1, updatedAsset);
      }
    },
    REMOVE_ASSET(state, assetId) {
      state.assets = state.assets.filter(
        a => a.fixed_asset_id !== assetId
      );
    },
  },
  actions: {
    async fetchAssets({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.get("/building/assets");
        if (response.data) {
          commit("SET_ASSETS", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки основных средств:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return [];
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async addAsset({ commit }, assetData) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.post("/building/assets", assetData);
        if (response.status === 201 && response.data.fixedAsset) {
          commit("ADD_ASSET", response.data.fixedAsset);
          return { success: true, asset: response.data.fixedAsset };
        }
        return { success: false, error: "Ошибка при добавлении" };
      } catch (error) {
        console.error("Ошибка при добавлении основного средства:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return { success: false, error: error.response?.data?.message || error.message };
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async updateAsset({ commit }, assetData) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.put("/building/assets", assetData);
        if (response.status === 200 && response.data.fixedAsset) {
          commit("UPDATE_ASSET", response.data.fixedAsset);
          return { success: true, asset: response.data.fixedAsset };
        }
        return { success: false, error: "Ошибка при обновлении" };
      } catch (error) {
        console.error("Ошибка при обновлении основного средства:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return { success: false, error: error.response?.data?.message || error.message };
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async saveAsset({ dispatch }, assetData) {
      if (assetData.fixed_asset_id) {
        return await dispatch("updateAsset", assetData);
      } else {
        return await dispatch("addAsset", assetData);
      }
    },

    async deleteAsset({ commit }, assetId) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.delete(`/assets/${assetId}`);
        if (response.status === 200) {
          commit("REMOVE_ASSET", assetId);
          return { success: true };
        }
        return { success: false, error: "Ошибка при удалении" };
      } catch (error) {
        console.error("Ошибка при удалении основного средства:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return { success: false, error: error.response?.data?.message || error.message };
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
  namespaced: true,
};