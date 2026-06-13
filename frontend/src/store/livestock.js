import instance from "@/middlewares";

export default {
  name: "livestock",
  state: {
    loading: false,
    error: null,
    animals: [],
    animalGroups: [],
  },
  mutations: {
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_ANIMALS(state, animals) {
      state.animals = animals;
    },
    ADD_ANIMAL(state, animal) {
      state.animals.push(animal);
    },
    UPDATE_ANIMAL(state, updatedAnimal) {
      const index = state.animals.findIndex(a => a.animal_id === updatedAnimal.animal_id);
      if (index !== -1) {
        state.animals.splice(index, 1, updatedAnimal);
      }
    },
    REMOVE_ANIMAL(state, animalId) {
      state.animals = state.animals.filter(a => a.animal_id !== animalId);
    },
  },
  actions: {
    async fetchAnimals({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.get("/animal/animal");
        if (response.data) {
          commit("SET_ANIMALS", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки животных:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return [];
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async addAnimal({ commit }, animalData) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.post("/animal/animal", animalData);
        if (response.status === 201 && response.data.animal) {
          commit("ADD_ANIMAL", response.data.animal);
          return { success: true, animal: response.data.animal };
        }
        return { success: false, error: "Ошибка при добавлении" };
      } catch (error) {
        console.error("Ошибка при добавлении животного:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return { success: false, error: error.response?.data?.message || error.message };
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async updateAnimal({ commit }, animalData) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.put("/animal/animal", animalData);
        if (response.status === 200 && response.data.animal) {
          commit("UPDATE_ANIMAL", response.data.animal);
          return { success: true, animal: response.data.animal };
        }
        return { success: false, error: "Ошибка при обновлении" };
      } catch (error) {
        console.error("Ошибка при обновлении животного:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return { success: false, error: error.response?.data?.message || error.message };
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async saveAnimal({ dispatch }, animalData) {
      if (animalData.animal_id) {
        return await dispatch("updateAnimal", animalData);
      } else {
        return await dispatch("addAnimal", animalData);
      }
    },
  },
  namespaced: true,
};