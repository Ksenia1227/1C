import instance from "@/middlewares";

export default {
  name: "crop",
  state: {
    loading: false,
    error: null,
    fields: [],
    nomenclatures: [],
    crops: [],
  },
  mutations: {
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_FIELDS(state, fields) {
      state.fields = fields;
    },
    ADD_FIELD(state, field) {
      state.fields.push(field);
    },
    UPDATE_FIELD(state, updatedField) {
      const index = state.fields.findIndex(f => f.field_id === updatedField.field_id);
      if (index !== -1) {
        state.fields.splice(index, 1, updatedField);
      }
    },
    REMOVE_FIELD(state, fieldId) {
      state.fields = state.fields.filter(f => f.field_id !== fieldId);
    },
    SET_NOMENCLATURES(state, nomenclatures) {
      state.nomenclatures = nomenclatures;
    },
    ADD_NOMENCLATURE(state, nomenclature) {
      state.nomenclatures.push(nomenclature);
    },
    UPDATE_NOMENCLATURE(state, updatedNomenclature) {
      const index = state.nomenclatures.findIndex(n => n.nomenclature_id === updatedNomenclature.nomenclature_id);
      if (index !== -1) {
        state.nomenclatures.splice(index, 1, updatedNomenclature);
      }
    },
    REMOVE_NOMENCLATURE(state, nomenclatureId) {
      state.nomenclatures = state.nomenclatures.filter(n => n.nomenclature_id !== nomenclatureId);
    },
    SET_CROPS(state, crops) {
      state.crops = crops;
    },
    ADD_CROP(state, crop) {
      state.crops.push(crop);
    },
    UPDATE_CROP(state, updatedCrop) {
      const index = state.crops.findIndex(c => c.crop_id === updatedCrop.crop_id);
      if (index !== -1) {
        state.crops.splice(index, 1, updatedCrop);
      }
    },
    REMOVE_CROP(state, cropId) {
      state.crops = state.crops.filter(c => c.crop_id !== cropId);
    },
  },
  actions: {
    async fetchFields({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.get("/plants/field");
        if (response.data) {
          commit("SET_FIELDS", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки полей:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return [];
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async addField({ commit }, fieldData) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.post("/plants/field", fieldData);
        if (response.status === 201 && response.data.field) {
          commit("ADD_FIELD", response.data.field);
          return { success: true, field: response.data.field };
        }
        return { success: false, error: "Ошибка при добавлении" };
      } catch (error) {
        console.error("Ошибка при добавлении поля:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return { success: false, error: error.response?.data?.message || error.message };
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async updateField({ commit }, fieldData) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.put("/plants/field", fieldData);
        if (response.status === 200 && response.data.field) {
          commit("UPDATE_FIELD", response.data.field);
          return { success: true, field: response.data.field };
        }
        return { success: false, error: "Ошибка при обновлении" };
      } catch (error) {
        console.error("Ошибка при обновлении поля:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return { success: false, error: error.response?.data?.message || error.message };
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async saveField({ dispatch }, fieldData) {
      if (fieldData.field_id) {
        return await dispatch("updateField", fieldData);
      } else {
        return await dispatch("addField", fieldData);
      }
    },

    async fetchNomenclatures({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.get("/g_data/nomeclature");
        if (response.data) {
          commit("SET_NOMENCLATURES", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки номенклатуры:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return [];
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async addNomenclature({ commit }, nomenclatureData) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.post("/g_data/nomeclature", nomenclatureData);
        if (response.status === 201 && response.data.nomenclature) {
          commit("ADD_NOMENCLATURE", response.data.nomenclature);
          return { success: true, nomenclature: response.data.nomenclature };
        }
        return { success: false, error: "Ошибка при добавлении" };
      } catch (error) {
        console.error("Ошибка при добавлении номенклатуры:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return { success: false, error: error.response?.data?.message || error.message };
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async updateNomenclature({ commit }, nomenclatureData) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.put("/g_data/nomeclature", nomenclatureData);
        if (response.status === 200 && response.data.nomenclature) {
          commit("UPDATE_NOMENCLATURE", response.data.nomenclature);
          return { success: true, nomenclature: response.data.nomenclature };
        }
        return { success: false, error: "Ошибка при обновлении" };
      } catch (error) {
        console.error("Ошибка при обновлении номенклатуры:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return { success: false, error: error.response?.data?.message || error.message };
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async saveNomenclature({ dispatch }, nomenclatureData) {
      if (nomenclatureData.nomenclature_id) {
        return await dispatch("updateNomenclature", nomenclatureData);
      } else {
        return await dispatch("addNomenclature", nomenclatureData);
      }
    },

    async fetchCrops({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.get("/plants/crop");
        if (response.data) {
          commit("SET_CROPS", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки культур:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return [];
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async addCrop({ commit }, cropData) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.post("/plants/crop", cropData);
        if (response.status === 201 && response.data.crop) {
          commit("ADD_CROP", response.data.crop);
          return { success: true, crop: response.data.crop };
        }
        return { success: false, error: "Ошибка при добавлении" };
      } catch (error) {
        console.error("Ошибка при добавлении культуры:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return { success: false, error: error.response?.data?.message || error.message };
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async updateCrop({ commit }, cropData) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.put("/plants/crop", cropData);
        if (response.status === 200 && response.data.crop) {
          commit("UPDATE_CROP", response.data.crop);
          return { success: true, crop: response.data.crop };
        }
        return { success: false, error: "Ошибка при обновлении" };
      } catch (error) {
        console.error("Ошибка при обновлении культуры:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return { success: false, error: error.response?.data?.message || error.message };
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async saveCrop({ dispatch }, cropData) {
      if (cropData.crop_id) {
        return await dispatch("updateCrop", cropData);
      } else {
        return await dispatch("addCrop", cropData);
      }
    },
  },
  namespaced: true,
};