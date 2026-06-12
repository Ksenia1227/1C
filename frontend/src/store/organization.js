import instance from "@/middlewares";

export default {
  name: "organization",
  state: {
    loading: false,
    error: null,
    organizationData: null,
    divisions: [],
  },
  getters: {},
  mutations: {
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_ORGANIZATION_DATA(state, data) {
      state.organizationData = data;
    },
    SET_DIVISIONS(state, divisions) {
      state.divisions = divisions;
    },
  },
  actions: {
    async fetchOrganizationData({ commit }) {
      try {
        const response = await instance.get("/g_data/org");
        if (response.data && response.data.length > 0) {
          const orgData = response.data[0];
          commit("SET_ORGANIZATION_DATA", orgData);
          return orgData;
        }
        return null;
      } catch (error) {
        console.error("Ошибка загрузки данных организации:", error);
        return null;
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

    async saveOrganizationData({ commit, dispatch }, formData) {
      commit("SET_LOADING", true);
      
      try {
        const existingOrg = await dispatch("fetchOrganizationData");
        let orgResponse;
        let organizationId;
        
        if (existingOrg && existingOrg.organization_id) {
          orgResponse = await instance.put("/g_data/org", {
            ...formData.organization,
            organization_id: existingOrg.organization_id,
          });
          organizationId = existingOrg.organization_id;
        } else {
          orgResponse = await instance.post("/g_data/org", formData.organization);
          organizationId = orgResponse.data.organization.organization_id;
        }

        if (orgResponse.status === 200 || orgResponse.status === 201) {
          const existingDivisions = await dispatch("fetchDivisions");
          const newDivisions = formData.divisions.filter(d => d && d.trim());
          
          for (let i = 0; i < Math.max(existingDivisions.length, newDivisions.length); i++) {
            const newName = newDivisions[i];
            
            if (i < existingDivisions.length) {
              if (existingDivisions[i].name !== newName && newName) {
                await instance.put("/g_data/division", {
                  division_id: existingDivisions[i].division_id,
                  name: newName,
                });
              }
            } else if (newName) {
              await instance.post("/g_data/division", {
                name: newName,
                organization_id: organizationId,
              });
            }
          }
          
          alert("Данные успешно сохранены");
          await dispatch("fetchOrganizationData");
          await dispatch("fetchDivisions");
          return true;
        }
      } catch (error) {
        console.error("Ошибка при сохранении:", error);
        alert(error.response?.data?.message || "Произошла ошибка при сохранении данных");
        return false;
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
  namespaced: true,
};