<template>
  <form @submit.prevent="sendForm" class="dynamic-form">
    <div class="form-section">
      <h3>Сотрудники</h3>
      <div class="employees-list">
        <div v-for="(employee, idx) in formData.employees" :key="idx" class="employee-card">
          <div class="card-header">
            <span>Сотрудник {{ idx + 1 }}</span>
            <button type="button" class="remove-btn" @click="removeEmployee(idx)">✕</button>
          </div>
          <div class="form-grid">
            <div class="form-field full-width">
              <label>ФИО</label>
              <div style="display: flex; gap: 8px;">
                <input v-model="employee.last_name" placeholder="Фамилия" type="text" style="flex: 1;" />
                <input v-model="employee.name" placeholder="Имя" type="text" style="flex: 1;" />
                <input v-model="employee.middle_name" placeholder="Отчество" type="text" style="flex: 1;" />
              </div>
            </div>
            <div class="form-field">
              <label>Пол</label>
              <select v-model="employee.gender">
                <option value="Мужской">Мужской</option>
                <option value="Женский">Женский</option>
              </select>
            </div>
            <div class="form-field">
              <label>Дата рождения</label>
              <input v-model="employee.date_of_birth" type="date" />
            </div>
            <div class="form-field">
              <label>ИНН</label>
              <input v-model="employee.inn" type="text" autocomplete="off"/>
            </div>
            <div class="form-field">
              <label>СНИЛС</label>
              <input v-model="employee.snils" type="text" autocomplete="off"/>
            </div>
            <div class="form-field">
              <label>Гражданство</label>
              <input v-model="employee.citizenship" type="text" />
            </div>
            <div class="form-field">
              <label>Паспорт</label>
              <input v-model="employee.passport" type="text" autocomplete="off"/>
            </div>
            <div class="form-field">
              <label>Кем выдан</label>
              <input v-model="employee.issued_by" type="text" />
            </div>
            <div class="form-field">
              <label>Дата выдачи</label>
              <input v-model="employee.date_issue" type="date" />
            </div>
            <div class="form-field full-width">
              <label>Адрес по прописке</label>
              <input v-model="employee.residence_address" type="text" />
            </div>
            <div class="form-field">
              <label>Телефон</label>
              <input v-model="employee.phone" type="tel" />
            </div>
            <div class="form-field">
              <label>Email</label>
              <input v-model="employee.email" type="email" />
            </div>
          </div>
        </div>
        <button type="button" class="add-btn" @click="addEmployee">+ Добавить сотрудника</button>
      </div>
    </div>

    <div class="form-actions">
      <button type="submit" class="save-btn" :disabled="loading">
        {{ loading ? "Сохранение..." : "Сохранить" }}
      </button>
      <button type="button" class="reset-btn" @click="resetForm">
        Сбросить
      </button>
    </div>
  </form>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "EmployeesForm",
  data() {
    return {
      loading: false,
      tempIdCounter: 0,
      formData: {
        employees: [],
      },
    };
  },
  computed: {
    ...mapState("employee", {
      storeEmployees: (state) => state.employees,
      storeLoading: (state) => state.loading,
    }),
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    ...mapActions("employee", ["fetchEmployees", "saveEmployee"]),

    generateTempId() {
      return `temp_${Date.now()}_${++this.tempIdCounter}`;
    },

    async loadData() {
      this.loading = true;

      await this.fetchEmployees();

      if (this.storeEmployees && Array.isArray(this.storeEmployees)) {
        this.formData.employees = this.storeEmployees.map((e) => {
          return {
            ...e,
            tempId: this.generateTempId(),
          };
        });
      } else {
        this.formData.employees = [];
      }

      this.loading = false;
    },

    addEmployee() {
      this.formData.employees.push({
        tempId: this.generateTempId(),
        last_name: "",
        name: "",
        middle_name: "",
        gender: "",
        date_of_birth: "",
        inn: "",
        snils: "",
        citizenship: "",
        passport: "",
        issued_by: "",
        date_issue: "",
        residence_address: "",
        phone: "",
        email: "",
      });
    },

    removeEmployee(index) {
      if (confirm("Вы уверены, что хотите удалить этого сотрудника?")) {
        this.formData.employees.splice(index, 1);
      }
    },

    async sendForm() {
      this.loading = true;

      for (let i = 0; i < this.formData.employees.length; i++) {
        const employee = this.formData.employees[i];

        if (!employee.last_name && !employee.name && !employee.employee_id) {
          console.log(`Сотрудник ${i + 1} не имеет ФИО, пропускаем`);
          continue;
        }

        const cleanData = {};
        for (const key in employee) {
          if (key !== 'tempId') {
            cleanData[key] = employee[key];
          }
        }
        
        await this.saveEmployee(cleanData);
      }

      this.loading = false;
      await this.loadData();
      alert("Данные сохранены");
    },

    resetForm() {
      if (confirm("Вы уверены, что хотите сбросить все изменения?")) {
        this.loadData();
      }
    },
  },
};
</script>

<style scoped>
.dynamic-form {
  max-width: 100%;
}

.form-section {
  margin-bottom: 32px;
}

.form-section h3 {
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(156, 39, 176, 0.2);
  color: #9c27b0;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.form-field {
  display: grid;
  grid-template-columns: 160px 1fr;
  align-items: center;
  gap: 12px;
}

.form-field.full-width {
  grid-column: span 2;
}

.form-field label {
  margin: 0;
  color: #000000;
  font-weight: normal;
}

.form-field input,
.form-field select {
  width: 100%;
  padding: 8px 12px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #000;
}

.employee-card {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid rgba(156, 39, 176, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(156, 39, 176, 0.2);
  font-weight: 600;
  color: #9c27b0;
}

.remove-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(244, 67, 54, 0.15);
  border: 1px solid rgba(244, 67, 54, 0.3);
  color: #f44336;
  cursor: pointer;
  font-size: 16px;
}

.add-btn {
  padding: 12px 20px;
  border-radius: 10px;
  background: rgba(156, 39, 176, 0.15);
  border: 1px solid rgba(156, 39, 176, 0.3);
  color: #9c27b0;
  cursor: pointer;
  width: fit-content;
  font-size: 14px;
  font-weight: 500;
  margin-top: 8px;
}

.form-actions {
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(156, 39, 176, 0.2);
}

.save-btn {
  padding: 10px 24px;
  border-radius: 8px;
  background: #9c27b0;
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.save-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.reset-btn {
  padding: 10px 24px;
  border-radius: 8px;
  background: transparent;
  border: 1px solid rgba(156, 39, 176, 0.3);
  color: #000;
  cursor: pointer;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  .form-field.full-width {
    grid-column: span 1;
  }
  .form-field {
    grid-template-columns: 1fr;
    gap: 6px;
  }
}
</style>