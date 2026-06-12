import instance from "@/middlewares";

export default {
  name: "employee",
  state: {
    loading: false,
    error: null,
    employees: [],
  },
  mutations: {
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_EMPLOYEES(state, employees) {
      state.employees = employees;
    },
    ADD_EMPLOYEE(state, employee) {
      state.employees.push(employee);
    },
    UPDATE_EMPLOYEE(state, updatedEmployee) {
      const index = state.employees.findIndex(
        e => e.employee_id === updatedEmployee.employee_id
      );
      if (index !== -1) {
        state.employees.splice(index, 1, updatedEmployee);
      }
    },
    REMOVE_EMPLOYEE(state, employeeId) {
      state.employees = state.employees.filter(
        e => e.employee_id !== employeeId
      );
    },
  },
  actions: {
    async fetchEmployees({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.get("/g_data/employee");
        if (response.data) {
          commit("SET_EMPLOYEES", response.data);
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Ошибка загрузки сотрудников:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return [];
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async addEmployee({ commit }, employeeData) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.post("/g_data/employee", employeeData);
        if (response.status === 201 && response.data.employee) {
          commit("ADD_EMPLOYEE", response.data.employee);
          return { success: true, employee: response.data.employee };
        }
        return { success: false, error: "Ошибка при добавлении" };
      } catch (error) {
        console.error("Ошибка при добавлении сотрудника:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return { success: false, error: error.response?.data?.message || error.message };
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async updateEmployee({ commit }, employeeData) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.put("/g_data/employee", employeeData);
        if (response.status === 200 && response.data.employee) {
          commit("UPDATE_EMPLOYEE", response.data.employee);
          return { success: true, employee: response.data.employee };
        }
        return { success: false, error: "Ошибка при обновлении" };
      } catch (error) {
        console.error("Ошибка при обновлении сотрудника:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return { success: false, error: error.response?.data?.message || error.message };
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async saveEmployee({ dispatch }, employeeData) {
      if (employeeData.employee_id) {
        return await dispatch("updateEmployee", employeeData);
      } else {
        return await dispatch("addEmployee", employeeData);
      }
    },

    async deleteEmployee({ commit }, employeeId) {
      commit("SET_LOADING", true);
      try {
        const response = await instance.delete(`/employee/${employeeId}`);
        if (response.status === 200) {
          commit("REMOVE_EMPLOYEE", employeeId);
          return { success: true };
        }
        return { success: false, error: "Ошибка при удалении" };
      } catch (error) {
        console.error("Ошибка при удалении сотрудника:", error);
        commit("SET_ERROR", error.response?.data?.message || error.message);
        return { success: false, error: error.response?.data?.message || error.message };
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
  namespaced: true,
};