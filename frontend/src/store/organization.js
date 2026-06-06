import instance from "@/middlewares";

export default {
  name: "organization",
  state: {
    loading: false,
    error: null,
  },
  getters: {},
  mutations: {
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },
  actions: {
    async sendOrganizationData({ commit }, formData) {
      commit("SET_LOADING", true);
      
      try {
        const orgResponse = await instance.post("/g_data/org", formData.organization, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (orgResponse.status === 201) {
          const organizationId = orgResponse.data.organization.organization_id;
          
          if (formData.divisions && formData.divisions.length > 0) {
            for (const divisionName of formData.divisions) {
              if (divisionName && divisionName.trim()) {
                await instance.post("/g_data/division", {
                  name: divisionName,
                  organization_id: organizationId,
                });
              }
            }
          }
          
          alert("Данные успешно сохранены");
          return true;
        }
      } catch (error) {
        console.error("Ошибка при сохранении:", error);
        commit("SET_ERROR", error.response?.data?.message || "Ошибка при отправке формы");
        alert(error.response?.data?.message || "Произошла ошибка при сохранении данных");
        return false;
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
  namespaced: true,
};